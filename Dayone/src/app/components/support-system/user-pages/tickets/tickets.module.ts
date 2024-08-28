import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ActiveTicketsComponent } from './active-tickets/active-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    TicketListComponent,
    ActiveTicketsComponent,
    ClosedTicketsComponent,
    CreateTicketsComponent,
    ViewTicketsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TicketsRoutingModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule, FormsModule,
    AngularEditorModule
  ]
})
export class TicketsModule { }
