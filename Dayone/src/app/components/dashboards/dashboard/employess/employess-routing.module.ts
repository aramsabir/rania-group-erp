import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';

const routes: Routes = [
  {
    path: 'employees',
    children: [
      {
        path: 'employee-list',
        component: EmployeeListComponent
      },
      {
        path: 'view-employee',
        component: ViewEmployeeComponent
      },
      {
        path: 'add-employee',
        component: AddEmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployessRoutingModule { }
