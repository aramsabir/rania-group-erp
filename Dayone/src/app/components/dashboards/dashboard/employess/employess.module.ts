import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployessRoutingModule } from './employess-routing.module';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewEmployeeComponent } from './view-employee/view-employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatDialogModule } from '@angular/material/dialog';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [
    EmployeeListComponent,
    ViewEmployeeComponent,
    AddEmployeeComponent
  ],
  imports: [
    CommonModule,
    EmployessRoutingModule,
    SharedModule,
    NgbModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    NgSelectModule,
    MatDialogModule,
    NgCircleProgressModule.forRoot({"responsive": true})
  ]
})
export class EmployessModule { }
