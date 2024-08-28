import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Profiles01Component } from '../profile/profiles01/profiles01.component';
import { Profiles02Component } from '../profile/profiles02/profiles02.component';
import { Profiles03Component } from '../profile/profiles03/profiles03.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pricing01',
        component: Profiles01Component
      },
      {
        path: 'pricing02',
        component: Profiles02Component
      },
      {
        path: 'pricing03',
        component: Profiles03Component
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PricingRoutingModule { }
