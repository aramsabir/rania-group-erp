import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserList01Component } from './user-list01/user-list01.component';
import { UserList02Component } from './user-list02/user-list02.component';
import { UserList03Component } from './user-list03/user-list03.component';
import { UserList04Component } from './user-list04/user-list04.component';

const routes: Routes = [
  {
    path: 'user-list',
    children: [
      {
        path: 'user-list01',
        component: UserList01Component
      },
      {
        path: 'user-list02',
        component: UserList02Component
      },
      {
        path: 'user-list03',
        component: UserList03Component
      },
      {
        path: 'user-list04',
        component: UserList04Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserListRoutingModule { }
