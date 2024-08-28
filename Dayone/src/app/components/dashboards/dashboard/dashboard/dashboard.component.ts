import { Component, OnInit } from '@angular/core';
import { Attendance } from './dashboard-table-data/attendance';
import { hiredCandidates } from './dashboard-table-data/hired-candidates';
import { JobApplication } from './dashboard-table-data/job-application';
import { JobOpening } from './dashboard-table-data/job-opening';
import * as data from './dashboardChartData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  TabStyle1 = 1;
  public layoutType: string = 'ltr';
  constructor() {}

  ngOnInit(): void {}

  AttendanceList = Attendance;
  JobApplicationList = JobApplication;
  hiredCandidatesList = hiredCandidates;
  JobOpeningList = JobOpening;

  RemoveElementFromJobArray(key: any) {
    this.JobApplicationList.forEach((value: any, index: any) => {
      if (value.id == key) this.JobApplicationList.splice(index, 1);
    });
  }
  RemoveElementFromHiredArray(key: any) {
    this.hiredCandidatesList.forEach((value: any, index: any) => {
      if (value.id == key) this.hiredCandidatesList.splice(index, 1);
    });
  }

  //Line Chart
  public MultipleChartOptions = data.lineChartOptions;
  public MultipleChartData = data.lineChartData;
  public MultipleChartType = data.lineChartType;

  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;

  public donutData = data.DonutChartData;
}
