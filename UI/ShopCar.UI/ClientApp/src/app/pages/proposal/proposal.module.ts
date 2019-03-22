import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProposalRoutingModule } from './proposal-routing.module';
import { ListProposalComponent } from './list-proposal/list-proposal.component';
import { AddProposalComponent } from './add-proposal/add-proposal.component';
import { DetailProposalComponent } from './detail-proposal/detail-proposal.component';

@NgModule({
  declarations: [ListProposalComponent, AddProposalComponent, DetailProposalComponent],
  imports: [
    CommonModule,
    ProposalRoutingModule
  ]
})
export class ProposalModule { }
