import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplyLeavesComponent } from './apply-leaves/apply-leaves.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { MyLeavesComponent } from './my-leaves/my-leaves.component';
import { PayslipsComponent } from './payslips/payslips.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'attendance',
        component: AttendanceComponent
      },
      {
        path: 'apply-leaves',
        component: ApplyLeavesComponent
      },
      {
        path: 'my-leaves',
        component: MyLeavesComponent
      },
      {
        path: 'payslips',
        component: PayslipsComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDashboardRoutingModule { }
