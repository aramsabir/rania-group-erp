import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgetPasswordRoutingModule } from './forget-password-routing.module';
import { ForgetPassword01Component } from './forget-password01/forget-password01.component';
import { ForgetPassword02Component } from './forget-password02/forget-password02.component';
import { ForgetPassword03Component } from './forget-password03/forget-password03.component';


@NgModule({
  declarations: [
    ForgetPassword01Component,
    ForgetPassword02Component,
    ForgetPassword03Component
  ],
  imports: [
    CommonModule,
    ForgetPasswordRoutingModule
  ]
})
export class ForgetPasswordModule { }
