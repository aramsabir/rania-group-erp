import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';

interface DialogData {
  data: any
}

@Component({
  selector: 'app-notice-board-dialog',
  templateUrl: './notice-board-dialog.component.html',
  styleUrls: ['./notice-board-dialog.component.scss']
})
export class NoticeBoardDialogComponent implements OnInit {
  noticeBoardData:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.noticeBoardData = data;
  }
  ngOnInit(): void {
  }

}
