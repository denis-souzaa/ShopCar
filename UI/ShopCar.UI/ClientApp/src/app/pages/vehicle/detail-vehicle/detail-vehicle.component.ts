import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LazyLoadEvent } from 'primeng/api';
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';
import { ProposalService } from '../../proposal/proposal.service';

@Component({
  selector: 'app-detail-vehicle',
  templateUrl: './detail-vehicle.component.html',
  styles: []
})
export class DetailVehicleComponent implements OnInit {

  id: number
  brand: string
  model: string
  year: number
  price: number
  sold: boolean

  proposal: any;
  totalRecords: number;
  isLoadingTable: boolean;

  constructor(public bsModalRef: BsModalRef,
    private proposalService: ProposalService) { }

  ngOnInit() {
    this.isLoadingTable = true;
  }

  loadProposalLazy(event: LazyLoadEvent) {
    this.isLoadingTable = true;

    this.fetchProposal((event.first / event.rows), event.rows, undefined, event.globalFilter)
  }

  fetchProposal(pageNumber: number = 1, pageSize: number = 10, sort: string = 'DateProposal DESC', searchTerm = '') {

    this.isLoadingTable = true;
    
    const params = new PaginationParams(pageNumber, pageSize, sort).setFilter(searchTerm)

    this.proposalService.getProposalByVehicle(this.id,params).subscribe(
      (data) => {
        this.proposal = data.items
        this.totalRecords = data.totalItems
        this.isLoadingTable = false
      },
      error => {
        console.log('')
        this.isLoadingTable = false
      },
    )
  }

}
