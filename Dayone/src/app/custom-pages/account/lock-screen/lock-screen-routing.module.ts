import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockScreen01Component } from './lock-screen01/lock-screen01.component';
import { LockScreen02Component } from './lock-screen02/lock-screen02.component';
import { LockScreen03Component } from './lock-screen03/lock-screen03.component';


const routes: Routes = [
  {
    path: 'lock-screen',
    children: [
      {
        path: 'lock-screen01',
        component: LockScreen01Component
      },
      {
        path: 'lock-screen02',
        component: LockScreen02Component
      },
      {
        path: 'lock-screen03',
        component: LockScreen03Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LockScreenRoutingModule { }
