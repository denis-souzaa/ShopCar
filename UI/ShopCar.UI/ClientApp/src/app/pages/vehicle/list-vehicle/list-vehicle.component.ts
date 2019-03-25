import { Component, OnInit, Pipe } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';
import { VehicleService } from '../vehicle.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalService, ModalOptions } from 'ngx-bootstrap';
import { AddVehicleComponent } from '../add-vehicle/add-vehicle.component';
import { DetailVehicleComponent } from '../detail-vehicle/detail-vehicle.component';
import { NotificationsService } from 'src/app/shared/_services';
import { SnotifyPosition } from 'ng-snotify';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styles: []
})

export class ListVehicleComponent implements OnInit {

  vehicles: any
  totalRecords: number
  isLoadingTable: boolean
  form: FormGroup

  constructor(private fb: FormBuilder,
                private notificationService: NotificationsService,
                private vehicleService: VehicleService,
                private modalService: BsModalService) { }

  ngOnInit() {
    this.isLoadingTable = true;

    this.form = this.fb.group({
      searchTerm: [undefined]
    })
  }

  loadVehiclesLazy(event: LazyLoadEvent) {
    this.isLoadingTable = false;

    this.fetchVehicles((event.first / event.rows), event.rows, undefined, event.globalFilter)
  }

  fetchVehicles(pageNumber: number = 1, pageSize: number = 10, sort: string = 'Year DESC', searchTerm = '') {

    this.isLoadingTable = true;

    searchTerm = this.getValues.searchTerm.value || "";

    const params = new PaginationParams(pageNumber, pageSize, sort).setFilter(searchTerm)

    this.vehicleService.getVehicle(params).subscribe(
      (data) => {
        this.vehicles = data.items
        this.totalRecords = data.totalItems
        this.isLoadingTable = false
      },
      error => {
        console.log('houve um erro ao obter os veiculos')
        this.isLoadingTable = false
      },
    )
  }

  get getValues() {
    return this.form.controls;
  }

  add() {
    this.openModal(null, AddVehicleComponent);
    this.modalService.onHide.subscribe(_ => this.fetchVehicles())
  }

  edit(vehicle: any) {
    this.openModal(vehicle, AddVehicleComponent)
    this.modalService.onHide.subscribe(_ => this.fetchVehicles())
  }

  detail(vehicle: any) {
    this.openModal(vehicle, DetailVehicleComponent)
  }

  remove(id: number) {
    this.notificationService.confirm('Deseja realmente excluir este item?', {
      timeout: 0,
      position: SnotifyPosition.centerCenter,
      progressBar: false,
      backdrop: 0.7,
      buttons: [
        { text: 'Não', action: (toast) => this.notificationService.closeToast(toast) },
        {
          text: 'Sim', action: (toast) => {
            this.vehicleService.removeVehicle(id).subscribe(result => {
              this.notificationService.onSuccess(result.message)
              this.fetchVehicles()
            },
              error => this.notificationService.onError(error.error))
            this.notificationService.closeToast(toast)
          }
        }
      ]
    })
  }

  changeStatus(id: number){
    this.notificationService.confirm('Deseja realmente realizar a venda deste veículo?', {
      timeout: 0,
      position: SnotifyPosition.centerCenter,
      progressBar: false,
      backdrop: 0.7,
      buttons: [
        { text: 'Não', action: (toast) => this.notificationService.closeToast(toast) },
        {
          text: 'Sim', action: (toast) => {
            this.vehicleService.soldVehicle(id).subscribe(result => {
              this.notificationService.onSuccess(result.message)
              this.fetchVehicles()
            },
              error => this.notificationService.onError(error.error))
            this.notificationService.closeToast(toast)
          }
        }
      ]
    })
  }

  openModal(initialState: any, component: any) {
    const config: ModalOptions = {
      keyboard: false,
      backdrop: 'static',
      class: 'modal-lg',
      initialState: initialState
    };

    this.modalService.show(component, config);
  }

}
