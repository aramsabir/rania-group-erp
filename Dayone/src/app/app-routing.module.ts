import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { content } from './shared/routes/content.routes';

import { ContentComponent } from './shared/layout-components/layout/content/content.component';
import { AuthGuard } from './@core/guards';
import { ErrorComponent } from './shared/layout-components/layout/error/error.component';
import { error } from './shared/routes/error.routes';
import { AccountComponent } from './shared/layout-components/layout/account/account.component';
import { account } from './shared/routes/account';
import { MainContentComponent } from './shared/layout-components/layout/main-content/content.component';
import { Error404Component } from './auth/error404/error404.component';
import { SettingsContentComponent } from './shared/layout-components/sub_layouts/settings/content/content.component';
import { EmployeesContentComponent } from './shared/layout-components/sub_layouts/employees/content/content.component';
import { RecruitmentContentComponent } from './shared/layout-components/sub_layouts/recruitments/content/content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: MainContentComponent,
    canActivate: [AuthGuard], loadChildren: () => import('../app/components/erp_home/bas-home.module').then((m) => m.BasHomeModule),
  },
  {
    path: 'employees',
    component: EmployeesContentComponent,
    canActivate: [AuthGuard], loadChildren: () => import('../app/components/erp_employees/module').then((m) => m.EmployeesModule),
  },
  {
    path: 'recruitments',
    component: RecruitmentContentComponent,
    canActivate: [AuthGuard], loadChildren: () => import('../app/components/erp_recruitment/recruitment.module').then((m) => m.RecruitmentModule),
  },
  {
    path: 'settings',
    component: SettingsContentComponent,
    canActivate: [AuthGuard], loadChildren: () => import('../app/components/erp_settings/module').then((m) => m.SettingsModule),
  },
   
  // {
  //   path: 'settings',
  //   loadChildren: () => import('../../components/erp_settings/module').then(m => m.SettingsModule)
  // },
  // {
  //   path: 'group',
  //   component: GroupContentComponent,
  //   canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/group/module').then(  (m) => m.Module ),
  // },
  // {
  //   path: 'aso-bricks',
  //   component: AsoBrickContentComponent,
  //   canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/aso-bricks/module').then(  (m) => m.Module ),
  // },
  // {
  //   path: 'hilal-bricks',
  //   component: HilalBrickContentComponent,
  //   canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/hilal-bricks/module').then(  (m) => m.Module ),
  // },
  // {
  //   path: 'hcnt',
  //   component: HCNTContentComponent,
  //   canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/hcnt/module').then(  (m) => m.Module ),
  // },
  // {
  //   path: 'family-mall',
  //   component: FMContentComponent,
  //   canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/family-mall/module').then(  (m) => m.Module ),
  // },
  // {
  //   path: 'settings',
  //   component: ContentComponent,
  //   canActivate: [AuthGuard],
  //   children: content,
  // },
  // {
  //   path: '',
  //   component: ErrorComponent,
  //   canActivate: [AuthGuard],
  //   children: error,
  // },
  // {
  //   path: '',
  //   component: AccountComponent,
  //   canActivate: [AuthGuard],
  //   children: account,
  // },
  // {
  //   path: '',
  //   component: SupportSystemComponent,
  //   canActivate:[AuthGuard],
  //   children: support,
  // },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/sign-in',
    component: LoginComponent,
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [
    [
      RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules,
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'legacy',
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
