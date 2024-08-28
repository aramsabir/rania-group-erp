import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollRoutingModule } from './payroll-routing.module';
import { EmployeeSalaryComponent } from './employee-salary/employee-salary.component';
import { AddPayrollComponent } from './add-payroll/add-payroll.component';
import { EditPayrollComponent } from './edit-payroll/edit-payroll.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EmployeeSalaryComponent,
    AddPayrollComponent,
    EditPayrollComponent
  ],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule
  ]
})
export class PayrollModule { }
