import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { GroupMainComponent } from './components/main/component';
import { ITMainComponent } from './components/it/component';
import { PlanReportComponent } from './components/all/plan/list.component';
 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: GroupMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:read'
        }
      },
      {
        path: 'main',
        component: GroupMainComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:read'
        }
      },
      {
        path: 'plan',
        component: PlanReportComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'group:plan',
        },
      },
      {
        path: 'it',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/it/module').then(  (m) => m.Module ),
      },
      {
        path: 'hr',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/hr/module').then(  (m) => m.Module ),
      },
      {
        path: 'scd',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/scd/module').then(  (m) => m.Module ),
      },
      {
        path: 'legal',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/legal/module').then(  (m) => m.Module ),
      },
      {
        path: 'administration',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/administration/module').then(  (m) => m.Module ),
      },
      {
        path: 'commercial',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/commercial/module').then(  (m) => m.Module ),
      },
      {
        path: 'property',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/properties/module').then(  (m) => m.Module ),
      },
      {
        path: 'reporting',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/reporting/module').then(  (m) => m.Module ),
      },
      {
        path: 'landscape',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/landscape/module').then(  (m) => m.Module ),
      },
      {
        path: 'safety',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/safety/module').then(  (m) => m.Module ),
      },
      {
        path: 'accounting_and_control',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/accounting_and_control/module').then(  (m) => m.Module ),
      },
      {
        path: 'pmo',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/pmo/module').then(  (m) => m.Module ),
      },
      {
        path: 'machines',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/machines/module').then(  (m) => m.Module ),
      },
      {
        path: 'finance',
        // component: ITMainComponent,
        loadChildren: () =>  import('./components/finance/module').then(  (m) => m.Module ),
      },

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoutingModule { }
