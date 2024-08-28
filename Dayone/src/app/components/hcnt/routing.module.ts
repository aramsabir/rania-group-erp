import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesPerMonthComponent } from './components/sales_per_month/component';
import { RoleGuard } from 'src/app/@core/guards';
import { SalesPerCustomerComponent } from './components/sales_per_customer/component';
import { HCNTMainComponent } from './components/main/component';
import { SalesPerConcreteTypeComponent } from './components/sales_per_product_type/component';
import { SalesPerDateComponent } from './components/sales_per_date/component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HCNTMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:read'
        }
      },
      {
        path: 'main',
        component: HCNTMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:read'
        }
      },
      {
        path: 'sales-per-date',
        component: SalesPerDateComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:sales-per-date'
        }
      },
      {
        path: 'sales-per-month',
        component: SalesPerMonthComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:sales-per-month'
        }
      },
      {
        path: 'sales-per-product-type',
        component: SalesPerConcreteTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:sales-per-product-type'
        }
      },
      {
        path: 'sales-per-customer',
        component: SalesPerCustomerComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hcnt:sales-per-customer'
        }
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
