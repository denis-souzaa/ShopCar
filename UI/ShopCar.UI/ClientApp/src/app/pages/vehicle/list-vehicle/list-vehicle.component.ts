import { Component, OnInit } from '@angular/core';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styles: []
})
export class ListVehicleComponent implements OnInit {

  loading: boolean;

  constructor() { }

  ngOnInit() {
  }

  loadAnunciosLazy(event: LazyLoadEvent) {
    this.loading = false;
  }

}
