import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { SortableHeader, SortEvent } from 'src/app/shared/directives/sortable.directive';
import { ExpensesDialogComponent } from './expenses-dialog/expenses-dialog.component';
import { expensesService } from './expenses.service';
import { expensesList } from './expensesTableData';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss'],
  providers: [expensesService, DecimalPipe]
})
export class ExpensesComponent implements OnInit {
  expenses$!: Observable<expensesList[]>;
  total$!: Observable<number>;
  @ViewChildren(SortableHeader) headers!: QueryList<SortableHeader>;
  constructor(private modalService: NgbModal, public service: expensesService, public dialog: MatDialog) {
    this.expenses$ = service.expensesData$;
    this.total$ = service.total$;
   }

  ngOnInit(): void {
  }

  open(content:any) {
    this.modalService.open(content, {backdrop : 'static' , windowClass : 'modalCusSty' })
  }
  
  openDialog(dataValue:any) {
    this.dialog.open(ExpensesDialogComponent, {
      data: {
        dataValue
      },
    });
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
  
  deleteData(d:any){
    this.expenses$.subscribe(result => {
      const index = result.indexOf(d);
      result.splice(index,1)
    })
   }

   checked(d:any){
    this.expenses$.subscribe(result =>{
      const index = result.indexOf(d);
      result[index].check = false
      result[index].x = false
      result[index].ApprovalStatus = "Approved"
      result[index].statusBg = "badge badge-success"
    })
   }
   cancel(d:any){
    this.expenses$.subscribe(result =>{
      const index = result.indexOf(d);
      result[index].check = false
      result[index].x = false
      result[index].ApprovalStatus = "Rejected"
      result[index].statusBg = "badge badge-danger"
    })

   }
}
