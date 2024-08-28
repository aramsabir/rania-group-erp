import { ChangeDetectionStrategy, Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { NgbdModal1Content } from '../attendence-list/attendence-list.component';
import { DataAttendanceByUserService, PersonAttendanceByUser } from './attendanceByUserSelectDropdown.service';
import { AttendanceByUserService } from './attendence-by-user.service';
import { attendanceByUserType } from './attendenceByUserTableData';

@Component({
  selector: 'app-attendence-by-user',
  templateUrl: './attendence-by-user.component.html',
  styleUrls: ['./attendence-by-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AttendenceByUserComponent implements OnInit {
  model!: NgbDateStruct;
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  attendanceByUser$!: Observable<attendanceByUserType[]>;
  total$!: Observable<number>;
  
  constructor(private modalService: NgbModal,
    public service: AttendanceByUserService,
    private dataService: DataAttendanceByUserService) {
    this.attendanceByUser$ = service.attendanceByUserData$;
    this.total$ = service.total$;
   }


  fullDay() {
	this.modalService.open(NgbdModal1Content);
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
  deleteData(d:any){
    this.attendanceByUser$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }
}
