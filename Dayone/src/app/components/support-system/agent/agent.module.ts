import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentRoutingModule } from './agent-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AssignedCategoriesComponent } from './assigned-categories/assigned-categories.component';
import { TicketsModule } from './tickets/tickets.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    AssignedCategoriesComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    TicketsModule,
    NgbModule, 
    FormsModule, ReactiveFormsModule,
    NgSelectModule,
    NgChartsModule
  ]
})
export class AgentModule { }
