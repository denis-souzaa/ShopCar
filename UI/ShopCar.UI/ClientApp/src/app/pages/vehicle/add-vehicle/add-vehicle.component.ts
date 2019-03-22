import { Component, OnInit } from '@angular/core';
import {BsModalService, ModalOptions} from "ngx-bootstrap";

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styles: []
})
export class AddVehicleComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

}
