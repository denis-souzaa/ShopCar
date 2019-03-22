import { NgModule }        from '@angular/core';
import { CommonModule }    from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule }    from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { GrowlModule, MessagesModule } from 'primeng/primeng';
import { NotificationsService }        from '../shared/_services/notifications.service';

@NgModule({
  imports     : [
    CommonModule,
    RouterModule,
    GrowlModule,
    BsDropdownModule.forRoot(),
    MessagesModule,
  ],
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  exports     : [LayoutComponent],
  providers   : [NotificationsService]
})
export class UiModule { }
