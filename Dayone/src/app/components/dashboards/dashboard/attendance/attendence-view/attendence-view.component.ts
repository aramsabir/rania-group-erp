import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../attendence-by-user/attendanceByUserSelectDropdown.service';
import { AttendanceViewService } from './attendence-view.service';
import { attendanceViewType } from './attendenceViewTableData';

@Component({
  selector: 'app-attendence-view',
  templateUrl: './attendence-view.component.html',
  styleUrls: ['./attendence-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendenceViewComponent implements OnInit {
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  model!: NgbDateStruct;
  attendanceView$!: Observable<attendanceViewType[]> | any;
  total$!: Observable<number>;
  constructor( public dataService: DataAttendanceByUserService, public service: AttendanceViewService) {
    this.attendanceView$ = service.attendanceViewData$;
    this.total$ = service.total$;
  }

  month$!: Observable<PersonAttendanceByUser[]>;
  year$!: Observable<PersonAttendanceByUser[]>;
  empName$!: Observable<PersonAttendanceByUser[]>;
  selectedMonthId:any = "January";
  selectedYearId:any = "2021";
  selectedEmpName:any = "10";

  ngOnInit() {
    this.month$ = this.dataService.getMonth();
    this.year$ = this.dataService.getYear();
    this.empName$ = this.dataService.getEmpName();
  }
  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach((header:any) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
