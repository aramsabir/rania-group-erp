import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DataAttendanceByUserService, PersonAttendanceByUser } from '../../attendance/attendence-by-user/attendanceByUserSelectDropdown.service';

@Component({
  selector: 'app-edit-payroll',
  templateUrl: './edit-payroll.component.html',
  styleUrls: ['./edit-payroll.component.scss']
})
export class EditPayrollComponent implements OnInit {
  constructor(private modalService: NgbModal, private dataService: DataAttendanceByUserService) { }

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

  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }


}
