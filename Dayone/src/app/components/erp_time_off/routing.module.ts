import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { MainComponent } from './main.component';
import { EmployeeTimeOffComponent } from './components/timeoff-calendar/list.component';
import { AllocationsComponent } from './components/allocations/list.component';
import { TimeOffTypeComponent } from './components/time_off_types/list.component';
import { TimeOffApprovalsComponent } from './components/approval/list.component';
 
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
        component: EmployeeTimeOffComponent,
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
          expectedRole:'time-off:admin'
        }
      },
      {
        path: 'approvals',
        component: TimeOffApprovalsComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'time-off:approval'
        }
      },
      {
        path: 'time-off-types',
        component: TimeOffTypeComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'time-off:admin'
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
