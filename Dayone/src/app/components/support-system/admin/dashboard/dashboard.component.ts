import { Component, OnInit } from '@angular/core';
import { UserPagedashboardType, UserPageData } from '../../user-pages/dashboard/dashboard.component';
import * as data from '../../user-pages/dashboard/supportChartData';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  page = 1;
  pageSize = 5;
  collectionSize = UserPageData.length;
  dashboard!: UserPagedashboardType[];
  
  constructor() {this.refreshDashboardData(); }

  ngOnInit(): void {
  }
  refreshDashboardData() {
    this.dashboard = UserPageData
      .map((DashboardData, i) => ({id: i + 1, ...DashboardData}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }
  
  public donutData = data.DonutChartData;
}
