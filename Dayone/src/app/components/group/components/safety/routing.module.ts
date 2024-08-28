import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './component';
import { RoleGuard } from 'src/app/@core/guards';
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
          expectedRole: 'group:pmo',
        },
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:pmo',
        },
      },
      {
        path: 'plan',
        component: PlanReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:pmo',
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
