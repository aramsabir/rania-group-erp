import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { Invoice01Component } from './invoice01/invoice01.component';
import { Invoice02Component } from './invoice02/invoice02.component';
import { Invoice03Component } from './invoice03/invoice03.component';
import { AddInvoiceComponent } from './add-invoice/add-invoice.component';
import { EditInvoiceComponent } from './edit-invoice/edit-invoice.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    InvoiceListComponent,
    Invoice01Component,
    Invoice02Component,
    Invoice03Component,
    AddInvoiceComponent,
    EditInvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class InvoiceModule { }
