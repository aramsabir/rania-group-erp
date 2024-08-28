import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/@core/pipes/pipes.module';
import { ArchwizardModule } from 'angular-archwizard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxNotifierModule } from 'ngx-notifier';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { RoutingModule } from './routing.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { RevenuePerMonthComponent } from './components/sales_per_month/component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { HbfMainComponent } from './components/main/component';
import { HighchartsChartModule } from 'highcharts-angular';
import { RevenuePerCustomerComponent } from './components/sales_per_customer/component';
import { SalesPerBrickTypeComponent } from './components/sales_per_brick_type/component';
import { SalesPerGovComponent } from './components/sales_per_gov/component';
import { InventoryAndSoldComponent } from './components/inventory_and_sold/component';
import { InventoryComponent } from './components/inventory/component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    RevenuePerMonthComponent,
    RevenuePerCustomerComponent,
    SalesPerBrickTypeComponent,
    SalesPerGovComponent,
    HbfMainComponent,
    InventoryAndSoldComponent,
    InventoryComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    PipesModule,
    ArchwizardModule,
    PdfViewerModule,
    ReactiveFormsModule,
    HighchartsChartModule,
    FormsModule,
    NgSelectModule,
    NgxNotifierModule,
    NgbModule,
    SweetAlert2Module,
    MatSnackBarModule,
    NgxMaterialTimepickerModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    NotificationsService
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]

})
export class Module { }
