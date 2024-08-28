import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AwardsComponent } from './awards/awards.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { EventsComponent } from './events/events.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { NoticeBoardComponent } from './notice-board/notice-board.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'department',
        component: DepartmentComponent
      },
      {
        path: 'awards',
        component: AwardsComponent
      },
      {
        path: 'holidays',
        component: HolidaysComponent
      },
      {
        path: 'notice-board',
        component: NoticeBoardComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
