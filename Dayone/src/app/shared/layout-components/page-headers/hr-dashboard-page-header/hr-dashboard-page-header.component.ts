import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HrDashboardPageHeaderModalComponent } from '../hr-dashboard-page-header-modal/hr-dashboard-page-header-modal.component';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hr-dashboard-page-header',
  templateUrl: './hr-dashboard-page-header.component.html',
  styleUrls: ['./hr-dashboard-page-header.component.scss']
})
export class HrDashboardPageHeaderComponent implements OnInit {
  @Input() title!: string;
  model!: NgbDateStruct;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(HrDashboardPageHeaderModalComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }
  
  ngOnInit(): void {
  }

}
