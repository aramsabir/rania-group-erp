import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component';
import {  PerformanceReportComponent } from './components/staff_performance/list.component';
import { RoleGuard } from 'src/app/@core/guards';
import { WorkPercentageReportComponent } from './components/work-percentage/work-percentage.component';
import { StaffVisitReportComponent } from './components/staff_visit/list.component';
import { PlanReportComponent } from './components/plan/list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: 'plan',
        component: PlanReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: 'visits',
        component: StaffVisitReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: 'work-percentage',
        component: WorkPercentageReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: 'performance',
        component: PerformanceReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:legal',
        },
      },
      {
        path: '**',
        component: MainComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HRRoutingModule {}
