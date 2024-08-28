import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { content } from './shared/routes/content.routes';

import { ContentComponent } from './shared/layout-components/layout/content/content.component';
import { AuthGuard } from './@core/guards';
import { ErrorComponent } from './shared/layout-components/layout/error/error.component';
import { error } from './shared/routes/error.routes';
import { AccountComponent } from './shared/layout-components/layout/account/account.component';
import { account } from './shared/routes/account';
import { MainContentComponent } from './shared/layout-components/layout/main-content/content.component';
import { AsoBrickContentComponent } from './shared/layout-components/sub_layouts/aso-brick/content/content.component';
import { HilalBrickContentComponent } from './shared/layout-components/sub_layouts/hilal-brick/content/content.component';
import { GroupContentComponent } from './shared/layout-components/sub_layouts/group/content/content.component';
import { HCNTContentComponent } from './shared/layout-components/sub_layouts/hcnt/content/content.component';
import { Error404Component } from './auth/error404/error404.component';
import { FMContentComponent } from './shared/layout-components/sub_layouts/family-mall/content/content.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bas-home',
    pathMatch: 'full',
  },
  {
    path: 'bas-home',
    component: MainContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/bas-home/bas-home.module').then(  (m) => m.BasHomeModule ),
  },
  {
    path: 'group',
    component: GroupContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/group/module').then(  (m) => m.Module ),
  },
  {
    path: 'aso-bricks',
    component: AsoBrickContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/aso-bricks/module').then(  (m) => m.Module ),
  },
  {
    path: 'hilal-bricks',
    component: HilalBrickContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/hilal-bricks/module').then(  (m) => m.Module ),
  },
  {
    path: 'hcnt',
    component: HCNTContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/hcnt/module').then(  (m) => m.Module ),
  },
  {
    path: 'family-mall',
    component: FMContentComponent,
    canActivate: [AuthGuard],  loadChildren: () =>  import('../app/components/family-mall/module').then(  (m) => m.Module ),
  },
  {
    path: '',
    component: ContentComponent,
    canActivate: [AuthGuard],
    children: content,
  },
  {
    path: '',
    component: ErrorComponent,
    canActivate: [AuthGuard],
    children: error,
  },
  {
    path: '',
    component: AccountComponent,
    canActivate: [AuthGuard],
    children: account,
  },
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
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
        relativeLinkResolution: 'legacy',
      }),
    ],
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
