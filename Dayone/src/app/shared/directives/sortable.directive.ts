import {Directive, EventEmitter, Input, Output} from '@angular/core';
import { attendanceByUserType } from 'src/app/components/dashboards/dashboard/attendance/attendence-by-user/attendenceByUserTableData';
import { attendanceViewType } from 'src/app/components/dashboards/dashboard/attendance/attendence-view/attendenceViewTableData';
import { employeeList } from 'src/app/components/dashboards/dashboard/employess/employee-list/employeeListTableData';
import { expensesList } from 'src/app/components/dashboards/dashboard/expenses/expensesTableData';
import { noticeBoardList } from 'src/app/components/dashboards/dashboard/notice-board/noticaBoardTableData';
import { employeeAttendanceList } from 'src/app/components/dashboards/employee-dashboard/attendance/employeeAttendanceTableData';
import { Country } from 'src/app/components/apps/tables/table-modal/countreies.modal';

export type SortColumn = keyof noticeBoardList | '';
export type ExpensesSortColumn = keyof expensesList | '';
export type employeeSortColumn = keyof employeeList | '';
export type AttendanceByUserSortColumn = keyof attendanceByUserType | '';
export type AttendanceViewSortColumn = keyof attendanceViewType | '';
export type employeeAttendanceSortColumn = keyof employeeAttendanceList | '';
export type SortCountryColumn = keyof Country | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()'
  }
})
export class SortableHeader {

  @Input() sortable: SortColumn = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortable, direction: this.direction});
  }
}

