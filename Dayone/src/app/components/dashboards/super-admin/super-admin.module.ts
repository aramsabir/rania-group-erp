import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CompaniesComponent } from './companies/companies.component';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { SuperAdminsComponent } from './super-admins/super-admins.component';
import { SettingsComponent } from './settings/settings.component';
import { RoleAccessComponent } from './role-access/role-access.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardComponent,
    CompaniesComponent,
    SubscriptionPlansComponent,
    InvoicesComponent,
    SuperAdminsComponent,
    SettingsComponent,
    RoleAccessComponent
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule,
    NgChartsModule
  ]
})
export class SuperAdminModule { }
