import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from '@angular/core';
import { ListVehicleComponent } from '../../pages/vehicle/list-vehicle/list-vehicle.component';
import { ListProposalComponent } from 'src/app/pages/proposal/list-proposal/list-proposal.component';

export const AdminLayoutRoutes: Routes = [
    {
        path     : '',
        component: AdminLayoutComponent,
        children: [
            { path: 'veiculos', component: ListVehicleComponent },
            { path: 'propostas', component: ListProposalComponent },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'veiculos'
            }, {
                path: '**',
                redirectTo: ''
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})

export class AdminLayoutRouting {

}