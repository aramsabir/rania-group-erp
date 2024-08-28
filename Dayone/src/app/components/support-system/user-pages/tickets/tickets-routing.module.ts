import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveTicketsComponent } from './active-tickets/active-tickets.component';
import { ClosedTicketsComponent } from './closed-tickets/closed-tickets.component';
import { CreateTicketsComponent } from './create-tickets/create-tickets.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { ViewTicketsComponent } from './view-tickets/view-tickets.component';


const routes: Routes = [
  {
    path: 'user-pages/tickets',
    children: [
      {
        path: 'ticket-list',
        component: TicketListComponent
      },
      {
        path: 'active-tickets',
        component: ActiveTicketsComponent
      },
      {
        path: 'closed-tickets',
        component: ClosedTicketsComponent
      },
      {
        path: 'create-tickets',
        component: CreateTicketsComponent
      },
      {
        path: 'view-ticket',
        component: ViewTicketsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketsRoutingModule { }
