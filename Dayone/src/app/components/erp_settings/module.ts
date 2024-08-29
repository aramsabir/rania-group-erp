import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasSetingsRoutingModule } from './routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RolesComponent } from './components/roles/roles.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { PipesModule } from 'src/app/@core/pipes/pipes.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { QRCodeModule } from 'angularx-qrcode';
import { BasLogComponent } from './components/system-logs/system-logs.component';
import { CompaniesComponent } from './components/company/company.component';
import { BasPermissionsComponent } from './components/users/permissions/permissions.component';
import { MainComponent } from './main.component';
import { UserCompanyRoleComponent } from './components/users/roles/user-role.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    UsersComponent,
    RolesComponent,
    RoleDetailComponent,
    BasLogComponent,
    CompaniesComponent,
    BasPermissionsComponent,
    MainComponent,
    UserCompanyRoleComponent
  ],
  imports: [
    CommonModule,
    BasSetingsRoutingModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbModule,
    NgSelectModule,
    PipesModule,
    QRCodeModule
  ], 
  // providers: [
  //   {
  //     provide: PERFECT_SCROLLBAR_CONFIG,
  //     useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  //   }
  // ]
})
export class SettingsModule { }
