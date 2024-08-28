import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { RoleAccessComponent } from './role-access/role-access.component';
import { SettingsComponent } from './settings/settings.component';
import { SubscriptionPlansComponent } from './subscription-plans/subscription-plans.component';
import { SuperAdminsComponent } from './super-admins/super-admins.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'companies',
        component: CompaniesComponent
      },
      {
        path: 'subscription-plans',
        component: SubscriptionPlansComponent
      },
      {
        path: 'invoices',
        component: InvoicesComponent
      },
      {
        path: 'super-admins',
        component: SuperAdminsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'role-access',
        component: RoleAccessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
