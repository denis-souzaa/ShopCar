import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { BsModalService, ModalOptions } from "ngx-bootstrap";
import { ProposalService } from '../proposal.service';
import { PaginationParams } from 'src/app/shared/_helpers/paginationParams';
import { AddProposalComponent } from '../add-proposal/add-proposal.component';
@Component({
  selector: 'app-list-proposal',
  templateUrl: './list-proposal.component.html',
  styles: []
})
export class ListProposalComponent implements OnInit {

  proposal: any;
  saldos: any;
  totalItems: number;
  isLoadingTable: boolean;

  constructor(private proposalService: ProposalService,
    private modalService: BsModalService, ) { }

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

    this.proposalService.getProposal(params).subscribe(
      (data) => {
        this.proposal = data.items
        this.totalItems = data.totalItems
        this.isLoadingTable = false
      },
      error => {
        console.log('')
        this.isLoadingTable = false
      },
    )
  }

  add() {
    this.openModal(null, AddProposalComponent);
  }

  edit(proposal: any){
    this.openModal(proposal, AddProposalComponent)
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
