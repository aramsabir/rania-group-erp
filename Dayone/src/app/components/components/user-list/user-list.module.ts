import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserList01Component } from './user-list01/user-list01.component';
import { UserList02Component } from './user-list02/user-list02.component';
import { UserList03Component } from './user-list03/user-list03.component';
import { UserList04Component } from './user-list04/user-list04.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    UserList01Component,
    UserList02Component,
    UserList03Component,
    UserList04Component
  ],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class UserListModule { }
