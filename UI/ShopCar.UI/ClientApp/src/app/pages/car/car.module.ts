import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarRoutingModule } from './car-routing.module';
import { AddCarComponent } from './add-car/add-car.component';
import { DetailCarComponent } from './detail-car/detail-car.component';
import { ListCarComponent } from './list-car/list-car.component';

@NgModule({
  declarations: [AddCarComponent, DetailCarComponent, ListCarComponent],
  imports: [
    CommonModule,
    CarRoutingModule
  ]
})
export class CarModule { }
