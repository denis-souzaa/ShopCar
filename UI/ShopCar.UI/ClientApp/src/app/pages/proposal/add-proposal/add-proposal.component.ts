import { Component, OnInit } from '@angular/core';
import { BsModalService, ModalOptions, BsModalRef } from "ngx-bootstrap";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subject, concat, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
import { VehicleService } from '../../vehicle/vehicle.service';

@Component({
  selector: 'app-add-proposal',
  templateUrl: './add-proposal.component.html',
  styles: []
})
export class AddProposalComponent implements OnInit {

  form: FormGroup;

  vehicle$: Observable<any>;
  vehicleLoading = false;
  vehicleInput$ = new Subject<string>();

  constructor(private modalService: BsModalService,
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private vehicleService: VehicleService) { }

  ngOnInit() {
    this.buildForm()
    
    this.loadVehicles()
  }

  buildForm() {
    this.form = this.fb.group({
      id: [undefined],
      dateProposal: [undefined, Validators.required],
      car: [undefined, Validators.required],
      amount: [undefined, Validators.required],
      client: [undefined, Validators.required]
    })
  }

  get getControls() { return this.form.controls; }

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

}
