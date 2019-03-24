import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap";

@Component({
  selector: 'app-detail-proposal',
  templateUrl: './detail-proposal.component.html',
  styles: []
})
export class DetailProposalComponent implements OnInit {

  id: number
  dateProposal: any
  amount: any
  client: string
  vehicle: string
  brand: string

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }
}
