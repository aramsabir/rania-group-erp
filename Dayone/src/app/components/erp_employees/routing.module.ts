import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { MainComponent } from './main.component';
import { DepartmentComponent } from './components/departments/list.component';
import { JobTitleComponent } from './components/job_titles/list.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
 
const routes: Routes = [
  {
    path: '',
    children: [
 

      {
        path: '',
        component: MainComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:read'
        }
      },
      {
        path: 'main',
        component: MainComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:read'
        }
      },
      {
        path: 'departments',
        component: DepartmentComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:admin'
        }
      },
      {
        path: 'view_employee',
        component: ViewEmployeeComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:read'
        }
      },
      {
        path: 'job_titles',
        component: JobTitleComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:admin'
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
