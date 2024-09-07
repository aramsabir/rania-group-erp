import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompletedTasksComponent } from './completed-tasks/completed-tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPostComponent } from './new-post/new.component';
import { OnHoldTasksComponent } from './on-hold-tasks/on-hold-tasks.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { RunningTasksComponent } from './running-tasks/running-tasks.component';
import { ProccessBoardComponent } from './post-board/post-board.component';
import { PostListComponent } from './list/task-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewTasksComponent } from './view-tasks/view-tasks.component';
import { NotificationListComponent } from './notification-list/notify-list.component';
import { RoleGuard } from 'src/app/@core/guards';
import { UploadCandidateComponent } from './upload-candidate/upload-candidate.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'process',
        component: ProccessBoardComponent
      },
      {
        path: 'upload-candidates',
        component: UploadCandidateComponent
      },
      {
        path: 'new',
        component: NewPostComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'recruitment:add',
        },
      },
      {
        path: 'update',
        component: NewPostComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'recruitment:update',
        },
      },
      {
        path: 'main',
        component: PostListComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'notification-list',
        component: NotificationListComponent
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
        path: 'view-task',
        component: ViewTasksComponent
      },
      {
        path: 'overview-calendar',
        component: OverviewCalendarComponent
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
export class RecruitmentRoutingModule { }
