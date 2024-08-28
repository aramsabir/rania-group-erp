import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { AwardsComponent } from './awards/awards.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { EventsComponent } from './events/events.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployessModule } from './employess/employess.module';
import { AttendanceModule } from './attendance/attendance.module';
import { PayrollModule } from './payroll/payroll.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import {MatDialogModule} from '@angular/material/dialog';
import { HolidayDialogComponent } from './holidays/holiday-dialog/holiday-dialog.component';
import { NoticeBoardDialogComponent } from './notice-board/notice-board-dialog/notice-board-dialog.component';
import { ExpensesDialogComponent } from './expenses/expenses-dialog/expenses-dialog.component';
import { AttendanceViewService } from './attendance/attendence-view/attendence-view.service';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentComponent,
    AwardsComponent,
    HolidaysComponent,
    NoticeBoardComponent,
    ExpensesComponent,
    EventsComponent,
    SettingsComponent,
    HolidayDialogComponent,
    NoticeBoardDialogComponent,
    ExpensesDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    EmployessModule,
    AttendanceModule,
    PayrollModule,
    SharedModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgSelectModule,
    MatDialogModule,
    NgChartsModule,
    NgApexchartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AttendanceViewService
  ]
})
export class DashboardModule { }
