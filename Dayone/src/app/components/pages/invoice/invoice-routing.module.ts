import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { Invoice01Component } from './invoice01/invoice01.component';
import { Invoice02Component } from './invoice02/invoice02.component';
import { Invoice03Component } from './invoice03/invoice03.component';

const routes: Routes = [
  {
    path: 'invoice',
    children: [
      {
        path: 'invoice-list',
        component: InvoiceListComponent
      },
      {
        path: 'invoice01',
        component: Invoice01Component
      },
      {
        path: 'invoice02',
        component: Invoice02Component
      },
      {
        path: 'invoice03',
        component: Invoice03Component
      },
      {
        path: 'add-invoice',
        component: AddInvoiceComponent
      },
      {
        path: 'edit-invoice',
        component: EditInvoiceComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
