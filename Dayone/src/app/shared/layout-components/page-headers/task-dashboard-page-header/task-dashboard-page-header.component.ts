import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskDashboardPageHeaderModalComponent } from '../task-dashboard-page-header-modal/task-dashboard-page-header-modal.component';

@Component({
  selector: 'app-task-dashboard-page-header',
  templateUrl: './task-dashboard-page-header.component.html',
  styleUrls: ['./task-dashboard-page-header.component.scss']
})
export class TaskDashboardPageHeaderComponent implements OnInit {

  @Input() title!: string;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(TaskDashboardPageHeaderModalComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit(): void {
  }

}
