import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertMessageRoutingModule } from './alert-message-routing.module';
import { SuccessMessageComponent } from './success-message/success-message.component';
import { WarningMessageComponent } from './warning-message/warning-message.component';
import { DangerMessageComponent } from './danger-message/danger-message.component';


@NgModule({
  declarations: [
    SuccessMessageComponent,
    WarningMessageComponent,
    DangerMessageComponent
  ],
  imports: [
    CommonModule,
    AlertMessageRoutingModule
  ]
})
export class AlertMessageModule { }
