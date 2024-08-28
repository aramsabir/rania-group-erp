import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendenceByUserComponent } from './attendence-by-user/attendence-by-user.component';
import { AttendenceListComponent } from './attendence-list/attendence-list.component';
import { AttendenceMarkComponent } from './attendence-mark/attendence-mark.component';
import { AttendenceViewComponent } from './attendence-view/attendence-view.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { RecentLeavesComponent } from './recent-leaves/recent-leaves.component';

const routes: Routes = [
  {
    path: 'attendance',
    children: [
      {
        path: 'attendence-list',
        component: AttendenceListComponent
      },
      {
        path: 'attendence-by-user',
        component: AttendenceByUserComponent
      },
      {
        path: 'attendence-view',
        component: AttendenceViewComponent
      },
      {
        path: 'overview-calendar',
        component: OverviewCalendarComponent
      },
      {
        path: 'attendence-mark',
        component: AttendenceMarkComponent
      },
      {
        path: 'leave-settings',
        component: LeaveSettingsComponent
      },
      {
        path: 'leave-applications',
        component: LeaveApplicationsComponent
      },
      {
        path: 'recent-leaves',
        component: RecentLeavesComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
