import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef, BsDatepickerConfig} from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { VehicleService } from '../../vehicle/vehicle.service';
import { ProposalService } from '../proposal.service';
import { NotificationsService } from 'src/app/shared/_services';
import {formatDate} from "@angular/common";
import { registerLocaleData } from '@angular/common';
import localeptBr from '@angular/common/locales/pt-PT';

registerLocaleData(localeptBr, 'ptBR');

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styles: []
})
export class AddProposalComponent implements OnInit {

  id: number
  dateProposal: any
  amount: any
  client: string

  form: FormGroup;
  submitted = false;

  vehicle$: Observable<any>;
  vehicleLoading = false;
  vehicleInput$ = new Subject<string>();

  colorTheme = 'theme-default';
 
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private notificationService: NotificationsService,
    private vehicleService: VehicleService,
    private proposalService: ProposalService) { }

  ngOnInit() {
    this.bsConfig = Object.assign({}, { 
      containerClass: this.colorTheme,
      dateInputFormat:"DD/MM/YYYY",
      locale:'pt-br'
    });

    this.buildForm()

    this.loadVehicles()
  }

  buildForm() {
    this.form = this.fb.group({
      id: [this.id],
      dateProposal: [this.dateProposal && formatDate(this.dateProposal,'dd/MM/yyyy','ptBR'), Validators.required],
      vehicle: [undefined, Validators.required],
      amount: [this.amount, Validators.required],
      client: [this.client, Validators.required]
    })
  }

  get getValues() {
    return this.form.controls;
  }

  private loadVehicles() {
    this.vehicle$ = concat(
      of([]), // default items
      this.vehicleInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(() => this.vehicleLoading = true),
        switchMap(term => this.vehicleService.getVehicles(term).pipe(
          catchError(() => of([])), // empty list on error
          tap(() => this.vehicleLoading = false)
        ))
      )
    );
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const proposal = {
      "vehicleId": this.getValues.vehicle.value,
      "dateProposal": this.getValues.dateProposal.value,
      "client": this.getValues.client.value,
      "amount":this.getValues.amount.value
    }

    this.proposalService.addProposal(proposal)
      .subscribe(
        result => {
          this.notificationService.onSuccess(result.message);
          this.bsModalRef.hide()
        },
        error => {
          this.notificationService.onError(error.error)
          console.log(error)
        })
  }

}
