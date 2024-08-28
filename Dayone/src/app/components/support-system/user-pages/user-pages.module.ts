import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { UserPagesRoutingModule } from './user-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { TicketsModule } from './tickets/tickets.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserPagesRoutingModule,
    TicketsModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    NgChartsModule,
  ],
  providers: [
    DecimalPipe
  ]
})
export class UserPagesModule { }
