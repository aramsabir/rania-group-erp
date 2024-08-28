import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Chat01Component } from './chat01/chat01.component';
import { Chat02Component } from './chat02/chat02.component';
import { Chat03Component } from './chat03/chat03.component';

const routes: Routes = [
  {
    path: 'chat',
    children: [
      {
        path: 'chat01',
        component: Chat01Component
      },
      {
        path: 'chat02',
        component: Chat02Component
      },
      {
        path: 'chat03',
        component: Chat03Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
