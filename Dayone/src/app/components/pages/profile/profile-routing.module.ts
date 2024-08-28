import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profiles01Component } from './profiles01/profiles01.component';
import { Profiles02Component } from './profiles02/profiles02.component';
import { Profiles03Component } from './profiles03/profiles03.component';

const routes: Routes = [
  {
    path: 'profile',
    children: [
      {
        path: 'profile01',
        component: Profiles01Component
      },
      {
        path: 'profile02',
        component: Profiles02Component
      },
      {
        path: 'profile03',
        component: Profiles03Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
