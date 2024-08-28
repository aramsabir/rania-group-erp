import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobDashboardRoutingModule } from './job-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobListsComponent } from './job-lists/job-lists.component';
import { JobViewComponent } from './job-view/job-view.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { NewJobComponent } from './new-job/new-job.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';


@NgModule({
  declarations: [
    DashboardComponent,
    JobListsComponent,
    JobViewComponent,
    JobApplicationsComponent,
    ApplyJobComponent,
    NewJobComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    JobDashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule,
    NgChartsModule, NgApexchartsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule
  ]
})
export class JobDashboardModule { }
