import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListProposalComponent } from './list-proposal/list-proposal.component';

const routes: Routes = [
  {
    path:'',
    component: ListProposalComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProposalRoutingModule { }
