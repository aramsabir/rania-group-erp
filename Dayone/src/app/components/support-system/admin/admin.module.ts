import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CustomersComponent } from './customers/customers.component';
import { CategoriesComponent } from './categories/categories.component';
import { ArticlesComponent } from './articles/articles.component';
import { TicketsModule } from './tickets/tickets.module';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    DashboardComponent,
    EditProfileComponent,
    CustomersComponent,
    CategoriesComponent,
    ArticlesComponent,
    CustomerViewComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TicketsModule,
    NgbModule,
    NgSelectModule,
    ReactiveFormsModule, FormsModule,
    NgApexchartsModule
  ]
})
export class AdminModule { }
