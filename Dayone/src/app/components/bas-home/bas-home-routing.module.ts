import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasHomeComponent } from './bas-home.component';

const routes: Routes = [
  {
    path: '**',
    component: BasHomeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasHomeRoutingModule { }
