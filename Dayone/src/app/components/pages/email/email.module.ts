import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailRoutingModule } from './email-routing.module';
import { EmailComposeComponent } from './email-compose/email-compose.component';
import { EmailInboxComponent } from './email-inbox/email-inbox.component';
import { EmailReadComponent } from './email-read/email-read.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    EmailComposeComponent,
    EmailInboxComponent,
    EmailReadComponent
  ],
  imports: [
    CommonModule,
    EmailRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class EmailModule { }
