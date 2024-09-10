import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { MainComponent } from './main.component';
import { EmployeeTimeoffComponent } from './components/timeoff-calendar/list.component';
import { AllocationsComponent } from './components/allocations/list.component';
 
const routes: Routes = [
  {
    path: '',
    children: [
 

      {
        path: '',
        component: MainComponent,
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'time-off:read'
        }
      },
      {
        path: 'employee-calendar',
        component: EmployeeTimeoffComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'time-off:read'
        }
      },
      {
        path: 'allocations',
        component: AllocationsComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'time-off:read'
        }
      },
      
 

   
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BasSetingsRoutingModule {}
