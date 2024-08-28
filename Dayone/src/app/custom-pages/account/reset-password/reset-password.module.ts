import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPassword01Component } from './reset-password01/reset-password01.component';
import { ResetPassword02Component } from './reset-password02/reset-password02.component';
import { ResetPassword03Component } from './reset-password03/reset-password03.component';


@NgModule({
  declarations: [
    ResetPassword01Component,
    ResetPassword02Component,
    ResetPassword03Component
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
