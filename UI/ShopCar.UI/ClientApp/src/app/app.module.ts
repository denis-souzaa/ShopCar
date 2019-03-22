import { BrowserModule }                       from '@angular/platform-browser';
import { LOCALE_ID, NgModule }                 from '@angular/core';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule }             from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import localePt               from '@angular/common/locales/pt';

import { TableModule }     from 'primeng/table';
import { PanelModule }     from 'primeng/panel';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule }    from 'primeng/button';

import { AppRoutingModule }                                   from './app-routing.module';
import { AppComponent }                                 from './app.component';
import { LoginComponent }                               from './login/login.component';
import { UiModule }                                     from './ui/ui.module';
import { AlertService }                                 from './shared/_services';
import { AlertComponent }                               from './shared/_components/alert/alert.component';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

import { defineLocale }         from 'ngx-bootstrap/chronos';
import { ptBrLocale }           from 'ngx-bootstrap/locale';
import { NotificationsService } from './shared/_services/notifications.service';

defineLocale('pt-br', ptBrLocale);

const ANGULAR_MODULES: any[] = [
  BrowserModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
  BrowserAnimationsModule
];

const EXTERNAL_MODULES: any[] = [
  TableModule,
  PanelModule,
  PaginatorModule,
  ButtonModule,
  SnotifyModule.forRoot()
];

const APP_MODULES: any[] = [
  UiModule,
  AppRoutingModule,
];

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations   : [
    AppComponent,
    LoginComponent,
    AlertComponent
  ],
  imports        : [
    ...ANGULAR_MODULES,
    ...EXTERNAL_MODULES,
    ...APP_MODULES,
  ],
  providers      : [
    AlertService,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    NotificationsService
  ],
  bootstrap      : [AppComponent],
  entryComponents: []
})
export class AppModule {
}