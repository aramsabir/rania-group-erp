import { Component, OnInit } from '@angular/core';
import * as data from '../../user-pages/dashboard/supportChartData';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Bar Chart 1
  public barChartOptions = data.barChartOptions1;
  public barChartData = data.barChartData1;
  public barChartType = data.barChartType1;
  public barChartPlugins = data.barChartPlugins1;

}
