import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticationGuard } from './shared/_guards';
import { AclGuard } from './shared/_guards/acl.guard';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent, canActivate: [AclGuard]
  },
  {
    path        : '',
    loadChildren: './pages/pages.module#PagesModule',canActivate: [AuthenticationGuard, AclGuard]
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
