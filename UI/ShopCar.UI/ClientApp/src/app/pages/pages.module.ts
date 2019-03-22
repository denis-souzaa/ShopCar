import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {PagesComponent} from './pages.component';
import {UiModule} from '../ui/ui.module';
import {NgxCurrencyModule} from 'ngx-currency';
import {SnotifyModule} from 'ng-snotify';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {TableModule} from "primeng/table";
import {BsDatepickerModule, ModalModule} from "ngx-bootstrap";

const MODULOS_ANGULAR  = [CommonModule, ReactiveFormsModule, FormsModule];
const MODULOS_EXTERNOS = [ModalModule.forRoot(), TableModule, NgSelectModule, NgxCurrencyModule,
	BsDatepickerModule.forRoot()];

// region Configurações padrão para o NgxCurrency
export const customCurrencyMaskConfig = {
	align: 'right',
	allowNegative: false,
	allowZero: true,
	decimal: ',',
	precision: 2,
	prefix: 'R$ ',
	suffix: '',
	thousands: '.',
	nullable: true
};

// endregion


@NgModule({
	imports: [
		CommonModule,
		UiModule,
		PagesRoutingModule,
		SnotifyModule,
		NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
		...MODULOS_ANGULAR,
		...MODULOS_EXTERNOS,
	],
	declarations: [
		PagesComponent,
	],
	exports: []
})
export class PagesModule {
}