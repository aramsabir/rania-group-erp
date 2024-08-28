import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogStylesComponent } from './blog-styles/blog-styles.component';
import { Blog01Component } from './blog01/blog01.component';
import { Blog02Component } from './blog02/blog02.component';
import { Blog03Component } from './blog03/blog03.component';

const routes: Routes = [
  {
    path: 'blog',
    children: [
      {
        path: 'blog01',
        component: Blog01Component
      },
      {
        path: 'blog02',
        component: Blog02Component
      },
      {
        path: 'blog03',
        component: Blog03Component
      },
      {
        path:'blog-styles',
        component: BlogStylesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
