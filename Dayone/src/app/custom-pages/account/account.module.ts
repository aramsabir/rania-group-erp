import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { ComingSoonComponent } from './coming-soon/coming-soon.component';
import { LoginModule } from './login/login.module';
import { ForgetPasswordModule } from './forget-password/forget-password.module';
import { RegisterModule } from './register/register.module';
import { LockScreenModule } from './lock-screen/lock-screen.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';


@NgModule({
  declarations: [
    UnderConstructionComponent,
    ComingSoonComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    LoginModule,
    ForgetPasswordModule,
    RegisterModule,
    LockScreenModule,
    ResetPasswordModule
  ]
})
export class AccountModule { }
