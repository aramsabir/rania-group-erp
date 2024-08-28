import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectDashboardRoutingModule } from './project-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    DashboardComponent,
    ProjectListComponent,
    ViewProjectComponent,
    OverviewCalendarComponent,
    NewProjectComponent
  ],
  imports: [
    CommonModule,
    ProjectDashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule,
    NgChartsModule,
    NgApexchartsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ]
})
export class ProjectDashboardModule { }
