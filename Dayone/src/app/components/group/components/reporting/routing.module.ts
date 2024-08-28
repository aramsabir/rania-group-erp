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
          expectedRole: 'group:reporting',
        },
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:reporting',
        },
      },
      {
        path: 'plan',
        component: PlanReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:reporting',
        },
      },
      {
        path: 'visits',
        component: StaffVisitReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:reporting',
        },
      },
      {
        path: 'work-percentage',
        component: WorkPercentageReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:reporting',
        },
      },
      {
        path: 'performance',
        component: PerformanceReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:reporting',
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
