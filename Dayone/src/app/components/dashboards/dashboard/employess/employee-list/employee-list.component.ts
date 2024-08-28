import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { EmployeeService } from './employee.service';
import { employeeList } from './employeeListTableData';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeService, DecimalPipe]
})
export class EmployeeListComponent implements OnInit {
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;

  employeeList$!: Observable<employeeList[]>;
  total$!: Observable<number>;
  
  constructor(private modalService: NgbModal, public service: EmployeeService) {
    this.employeeList$ = service.employeeData$;
    this.total$ = service.total$;
   }

  ngOnInit(): void {
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
    this.employeeList$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }
}
