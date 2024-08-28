import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiSettingsComponent } from './api-settings/api-settings.component';
import { GeneralSettingsComponent } from './general-settings/general-settings.component';
import { RoleAccessComponent } from './role-access/role-access.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'general-settings',
        component: GeneralSettingsComponent
      },
      {
        path: 'api-settings',
        component: ApiSettingsComponent
      },
      {
        path: 'role-access',
        component: RoleAccessComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
