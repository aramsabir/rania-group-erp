import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { employeeAttendanceService } from './employeeAttendance.service';
import { employeeAttendanceList } from './employeeAttendanceTableData';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [employeeAttendanceService, DecimalPipe]
})
export class AttendanceComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  employeeAttendance$!: Observable<employeeAttendanceList[]>;
  total$!: Observable<number>;
  Time:any;

  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
  constructor(private modalService: NgbModal, public service: employeeAttendanceService, public dialog: MatDialog) {
    this.employeeAttendance$ = service.employeeAttendanceData$;
    this.total$ = service.total$;
   }
 
   ngOnInit(): void {
     setInterval(()=>{
       this.Time = new Date()
     }, 1000)
   }

  onSort({column, direction}: SortEvent | any) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
  
}
