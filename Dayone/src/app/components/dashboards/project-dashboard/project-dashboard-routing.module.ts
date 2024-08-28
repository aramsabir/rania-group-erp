import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewProjectComponent } from './new-project/new-project.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { ViewProjectComponent } from './view-project/view-project.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'project-list',
        component: ProjectListComponent
      },
      {
        path: 'view-project',
        component: ViewProjectComponent
      },
      {
        path: 'overview-calendar',
        component: OverviewCalendarComponent
      },
      {
        path: 'new-project',
        component: NewProjectComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectDashboardRoutingModule { }
