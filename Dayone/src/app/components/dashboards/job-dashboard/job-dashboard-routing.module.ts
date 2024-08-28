import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyJobComponent } from './apply-job/apply-job.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobApplicationsComponent } from './job-applications/job-applications.component';
import { JobListsComponent } from './job-lists/job-lists.component';
import { JobViewComponent } from './job-view/job-view.component';
import { NewJobComponent } from './new-job/new-job.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'job-lists',
        component: JobListsComponent
      },
      {
        path: 'job-view',
        component: JobViewComponent
      },
      {
        path: 'job-applications',
        component: JobApplicationsComponent
      },
      {
        path: 'apply-job',
        component: ApplyJobComponent
      },
      {
        path: 'new-job',
        component: NewJobComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobDashboardRoutingModule { }
