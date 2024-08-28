import { Component, OnInit } from '@angular/core';
import * as data from './supportChartData';

export interface UserPagedashboardType {
  ID: string;
  title: string;
  priority: string;
  priorityStatus: string;
  category: string;
  date: string;
  statusText: string;
  status: string;
}

export const UserPageData:UserPagedashboardType[] = [
  {ID: '#289', title: 'Sed ut perspiciatis', priority: 'Low', priorityStatus: 'success', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#320', title: 'Excepteur occaecat', priority: 'Low', priorityStatus: 'success', category: 'Services', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
  {ID: '#837', title: 'Sample Test1', priority: 'High', priorityStatus: 'danger', category: '	Customization', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#124', title: 'Sample Test2', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
  {ID: '#309', title: 'Ut aut reiciendi', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#117', title: 'Unde omnis iste natus', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#276', title: 'Et harum quidem', priority: 'Medium', priorityStatus: 'warning', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#738', title: 'Maiores alias aut', priority: 'Low', priorityStatus: 'success', category: '	Services', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#498', title: 'Quis autem vel', priority: 'High', priorityStatus: 'danger', category: '	Support', date: '12-01-2021', status: 'success', statusText: 'Open'},
  {ID: '#298', title: 'Ut aut reiciendi', priority: 'High', priorityStatus: 'danger', category: '	Services', date: '12-01-2021', status: 'danger', statusText: 'Closed'},
]

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
  

  
  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;

  
}
