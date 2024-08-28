import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RevenuePerMonthComponent } from './components/sales_per_month/component';
import { RoleGuard } from 'src/app/@core/guards';
import { HbfMainComponent } from './components/main/component';
import { RevenuePerCustomerComponent } from './components/sales_per_customer/component';
import { SalesPerBrickTypeComponent } from './components/sales_per_brick_type/component';
import { SalesPerGovComponent } from './components/sales_per_gov/component';
import { InventoryAndSoldComponent } from './components/inventory_and_sold/component';
import { InventoryComponent } from './components/inventory/component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HbfMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:read'
        }
      },
      {
        path: 'main',
        component: HbfMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:read'
        }
      },
      {
        path: 'inventory-now',
        component: InventoryComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:inventory-now'
        }
      },
      {
        path: 'inventory-and-sold',
        component: InventoryAndSoldComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:inventory-and-sold-per-date'
        }
      },
      {
        path: 'sales-per-gov',
        component: SalesPerGovComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:sales-per-gov'
        }
      },
      {
        path: 'sales-per-month',
        component: RevenuePerMonthComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:sales-per-month'
        }
      },
      {
        path: 'sales-per-brick-type',
        component: SalesPerBrickTypeComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:sales-per-brick-type'
        }
      },
      {
        path: 'sales-per-customer',
        component: RevenuePerCustomerComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'hbf:sales-per-customer'
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
