import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component';
import {  KPIComponent } from './components/kpi/list.component';
import { RoleGuard } from 'src/app/@core/guards';
import { WorkPercentageReportComponent } from './components/work-percentage/work-percentage.component';
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
          expectedRole: 'group:supplychain',
        },
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:supplychain',
        },
      },
      {
        path: 'plan',
        component: PlanReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:supplychain',
        },
      },
      {
        path: 'kpi',
        component: KPIComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:supplychain',
        },
      },
      {
        path: 'work-percentage',
        component: WorkPercentageReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:supplychain',
        },
      },
      {
        path: 'performance',
        component: KPIComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:supplychain',
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
