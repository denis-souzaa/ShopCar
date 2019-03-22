import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children:[
      {
        path: 'veiculos',
        loadChildren:'./car/car.module#CarModule'
      },
      {
        path: 'propostas',
        loadChildren:'./proposal/proposal.module#ProposalModule'
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'veiculos'
      },
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
