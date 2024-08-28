import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ActiveTicketsComponent } from './active-tickets/active-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TicketListComponent,
    ActiveTicketsComponent,
    ClosedTicketsComponent,
    ViewTicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class TicketsModule { }
