import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  data: any
}

@Component({
  selector: 'app-expenses-dialog',
  templateUrl: './expenses-dialog.component.html',
  styleUrls: ['./expenses-dialog.component.scss']
})
export class ExpensesDialogComponent implements OnInit {

  expensesData:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.expensesData = data;
  }
  ngOnInit(): void {
  }

}
