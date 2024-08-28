import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsersComponent } from './components/users/users.component';
import { BasLogComponent } from './components/system-logs/system-logs.component';
import { BasPermissionsComponent } from './components/users/permissions/permissions.component';
 
const routes: Routes = [
  {
    path: '',
    children: [
 

      {
        path: 'users',
        component: UsersComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'user:read'
        }
      },
      {
        path: 'users/update-user-sources',
        component: BasPermissionsComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'userCompanies:read'
        }
      },
      {
        path: 'roles',
        component: RolesComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'role:read'
        }
      },
      {
        path: 'roles/detail',
        component: RoleDetailComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole: 'role:update'
        }
      },
      {
        path: 'logs',
        component: BasLogComponent,
        canActivate: [RoleGuard],
        data: {
          expectedRole: 'log:read'
        }
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasSetingsRoutingModule {}
