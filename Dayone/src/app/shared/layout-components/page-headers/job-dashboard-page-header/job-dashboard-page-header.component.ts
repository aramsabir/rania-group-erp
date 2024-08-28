import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobDashboardPageHeaderModalComponent } from '../job-dashboard-page-header-modal/job-dashboard-page-header-modal.component';

@Component({
  selector: 'app-job-dashboard-page-header',
  templateUrl: './job-dashboard-page-header.component.html',
  styleUrls: ['./job-dashboard-page-header.component.scss']
})
export class JobDashboardPageHeaderComponent implements OnInit {

  @Input() title!: string;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(JobDashboardPageHeaderModalComponent);
    dialogRef.afterClosed().subscribe(result => {});
  }

  ngOnInit(): void {
  }

}
