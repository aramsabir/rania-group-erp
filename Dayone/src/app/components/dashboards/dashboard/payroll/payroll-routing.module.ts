import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPayrollComponent } from './add-payroll/add-payroll.component';
import { EditPayrollComponent } from './edit-payroll/edit-payroll.component';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';

const routes: Routes = [
  {
    path: 'payroll',
    children: [
      {
        path: 'employee-salary',
        component: EmployeeSalaryComponent
      },
      {
        path: 'add-payroll',
        component: AddPayrollComponent
      },
      {
        path: 'edit-payroll',
        component: EditPayrollComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollRoutingModule { }
