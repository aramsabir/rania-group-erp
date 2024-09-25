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
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { EmployeeAttachmentsComponent } from './components/employee_attachments/list.component';
import { MatCalendar } from '@angular/material/datepicker';
import { AngularCalendarYearViewModule } from 'angular-calendar-year-view';
import { EmployeeTimeOffComponent } from './components/timeoff-calendar/list.component';
import { AllocationsComponent } from './components/allocations/list.component';
import { TimeOffTypeComponent } from './components/time_off_types/list.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    MainComponent,
    EmployeeTimeOffComponent,
    AllocationsComponent,
    TimeOffTypeComponent,

    
    ViewEmployeeComponent,
    EmployeeAttachmentsComponent

  ],
  imports: [
    CommonModule,
    BasSetingsRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbModule,
    NgSelectModule,
    PipesModule,
    QRCodeModule,
    NgCircleProgressModule.forRoot({"responsive": true}),
    AngularCalendarYearViewModule


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
export class TimeOffModule { }
