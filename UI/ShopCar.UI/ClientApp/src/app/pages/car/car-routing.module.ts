import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCarComponent } from './list-car/list-car.component';

const routes: Routes = [
  {
    path:'',
    component: ListCarComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarRoutingModule { }
