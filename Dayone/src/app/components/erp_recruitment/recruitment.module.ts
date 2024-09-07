import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruitmentRoutingModule } from './recruitment-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostListComponent } from './list/task-list.component';
import { RunningTasksComponent } from './running-tasks/running-tasks.component';
import { OnHoldTasksComponent } from './on-hold-tasks/on-hold-tasks.component';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { ProccessBoardComponent } from './post-board/post-board.component';
import { NewPostComponent } from './new-post/new.component';
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
import { PipesModule } from 'src/app/@core/pipes/pipes.module';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NotificationListComponent } from './notification-list/notify-list.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { UploadCandidateComponent } from './upload-candidate/upload-candidate.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [
    DashboardComponent,
    PostListComponent,
    RunningTasksComponent,
    OnHoldTasksComponent,
    CompletedTasksComponent,
    ViewTasksComponent,
    OverviewCalendarComponent,
    ProccessBoardComponent,
    NewPostComponent,
    UserProfileComponent,
    NotificationListComponent,
    UploadCandidateComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RecruitmentRoutingModule,
    SharedModule,
    NgbModule,
    NgxSliderModule,
    NgSelectModule,
    PdfViewerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    PipesModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    NgApexchartsModule,
    NgChartsModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    AngularEditorModule,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
  ],
})
export class RecruitmentModule { }
