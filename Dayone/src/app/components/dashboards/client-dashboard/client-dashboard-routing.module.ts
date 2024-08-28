import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewClientComponent } from './new-client/new-client.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ViewClientComponent } from './view-client/view-client.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'client-list',
        component: ClientListComponent
      },
      {
        path: 'view-client',
        component: ViewClientComponent
      },
      {
        path: 'new-client',
        component: NewClientComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDashboardRoutingModule { }
