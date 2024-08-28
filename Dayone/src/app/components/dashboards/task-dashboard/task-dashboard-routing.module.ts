import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewTasksComponent } from './new-tasks/new-tasks.component';
import { OnHoldTasksComponent } from './on-hold-tasks/on-hold-tasks.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { RunningTasksComponent } from './running-tasks/running-tasks.component';
import { TaskBoardComponent } from './task-board/task-board.component';
import { TaskListComponent } from './task-list/task-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'task-list',
        component: TaskListComponent
      },
      {
        path: 'running-tasks',
        component: RunningTasksComponent
      },
      {
        path: 'onhold-tasks',
        component: OnHoldTasksComponent
      },
      {
        path: 'completed-tasks',
        component: CompletedTasksComponent
      },
      {
        path: 'view-tasks',
        component: ViewTasksComponent
      },
      {
        path: 'overview-calendar',
        component: OverviewCalendarComponent
      },
      {
        path: 'task-board',
        component: TaskBoardComponent
      },
      {
        path: 'new-task',
        component: NewTasksComponent
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
export class TaskDashboardRoutingModule { }
