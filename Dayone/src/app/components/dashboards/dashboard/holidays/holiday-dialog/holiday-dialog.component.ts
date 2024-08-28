import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  data: any
}
@Component({
  selector: 'app-holiday-dialog',
  templateUrl: './holiday-dialog.component.html',
  styleUrls: ['./holiday-dialog.component.scss']
})
export class HolidayDialogComponent implements OnInit {
  Holidaydata:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.Holidaydata = data;
  }

  ngOnInit(): void {
  }

}
