import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRouting } from './admin-layout-routing.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';
import { AdminLayoutComponent } from './admin-layout.component';
import { ListVehicleComponent } from '../../pages/vehicle/list-vehicle/list-vehicle.component';
import { ComponentsModule } from 'src/app/shared/_components/compents.module';
import { ListProposalComponent } from 'src/app/pages/proposal/list-proposal/list-proposal.component';
import { ModalModule } from 'ngx-bootstrap';
import { AddProposalComponent } from 'src/app/pages/proposal/add-proposal/add-proposal.component';
defineLocale('pt-br', deLocale);

const PRIMENG_MODULES: any[] = [
  TableModule,
  ButtonModule,
];

const MODULOS_EXTERNOS = [
            ModalModule.forRoot(), TableModule,
              BsDatepickerModule.forRoot(),
              NgSelectModule
            ];


@NgModule({
  imports: [
    CommonModule,
    AdminLayoutRouting,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    PRIMENG_MODULES,
    ...MODULOS_EXTERNOS,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    AdminLayoutComponent,
    ListVehicleComponent,
    ListProposalComponent,
    AddProposalComponent
  ],
  entryComponents:[AddProposalComponent]
})

export class AdminLayoutModule {}