import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './shared/_guards';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { LoginComponent } from './pages/login/login.component';
import { AclGuard } from './shared/_guards/acl.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path        : '',
    loadChildren: () => AdminLayoutModule, canActivate: [AuthenticationGuard, AclGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
