import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasSetingsRoutingModule } from './routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PipesModule } from 'src/app/@core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { QRCodeModule } from 'angularx-qrcode';
import { MainComponent } from './main.component';
import { DepartmentComponent } from './components/departments/list.component';
import { JobTitleComponent } from './components/job_titles/list.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    MainComponent,
    DepartmentComponent,
    JobTitleComponent,
    ViewEmployeeComponent

  ],
  imports: [
    CommonModule,
    BasSetingsRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbModule,
    NgSelectModule,
    PipesModule,
    QRCodeModule
  ], 
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  schemas:[
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class EmployeesModule { }
