import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoListRoutingModule } from './todo-list-routing.module';
import { TodoList01Component } from './todo-list01/todo-list01.component';
import { TodoList02Component } from './todo-list02/todo-list02.component';
import { TodoList03Component } from './todo-list03/todo-list03.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    TodoList01Component,
    TodoList02Component,
    TodoList03Component
  ],
  imports: [
    CommonModule,
    TodoListRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class TodoListModule { }
