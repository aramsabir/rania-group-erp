import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskDashboardRoutingModule } from './task-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskListComponent } from './task-list/task-list.component';
import { RunningTasksComponent } from './running-tasks/running-tasks.component';
import { OnHoldTasksComponent } from './on-hold-tasks/on-hold-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DragulaModule } from 'ng2-dragula';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgChartsModule } from 'ng2-charts';
import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
};


@NgModule({
  declarations: [
    DashboardComponent,
    TaskListComponent,
    RunningTasksComponent,
    OnHoldTasksComponent,
    CompletedTasksComponent,
    ViewTasksComponent,
    OverviewCalendarComponent,
    TaskBoardComponent,
    NewTasksComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TaskDashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    NgApexchartsModule,
    NgChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AngularEditorModule
  ],
  providers:[
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class TaskDashboardModule { }
