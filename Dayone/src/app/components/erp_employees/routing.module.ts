import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleGuard } from 'src/app/@core/guards';
import { MainComponent } from './main.component';
import { DepartmentComponent } from './components/departments/list.component';
import { BasicDataComponent } from './components/basic-data/list.component';
import { ViewEmployeeComponent } from './components/view-employee/view-employee.component';
import { EmployeeAttachmentsComponent } from './components/employee_attachments/list.component';
 
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
        path: 'view_employee/attachments',
        component: EmployeeAttachmentsComponent,
        canActivate:[RoleGuard],
        data:{
          expectedRole:'employee:read'
        }
      },
      {
        path: 'basic-datas',
        component: BasicDataComponent,
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
