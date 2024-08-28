import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactList01Component } from './contact-list01/contact-list01.component';
import { ContactList02Component } from './contact-list02/contact-list02.component';

const routes: Routes = [
  {
    path: 'contact',
    children: [
      {
        path: 'contact-list01',
        component: ContactList01Component
      },
      {
        path: 'contact-list02',
        component: ContactList02Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactRoutingModule { }
