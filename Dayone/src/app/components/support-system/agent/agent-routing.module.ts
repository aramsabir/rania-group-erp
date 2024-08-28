import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssignedCategoriesComponent } from './assigned-categories/assigned-categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  {
    path: 'agent',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'assigned-categories',
        component: AssignedCategoriesComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentRoutingModule { }
