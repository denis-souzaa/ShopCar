import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale)

import { AppComponent } from './app.component';

import { LoginComponent } from './pages/login/login.component';
import { JwtInterceptor } from './shared/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './shared/_helpers/error.interceptor';

import { NotificationsService } from './shared/_services/notifications.service';
import { SnotifyService, ToastDefaults, SnotifyModule } from 'ng-snotify';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    SnotifyModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  bootstrap: [AppComponent],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    NotificationsService
  ]
})
export class AppModule { }
