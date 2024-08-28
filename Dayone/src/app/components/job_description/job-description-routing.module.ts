import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasJobDescriptionComponent } from './job-description.component';

const routes: Routes = [
  {
    path: '**',
    component: BasJobDescriptionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasJobDescriptionRoutingModule { }
