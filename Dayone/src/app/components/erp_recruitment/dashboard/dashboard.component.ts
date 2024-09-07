import { Component, OnInit } from '@angular/core';
import * as  data from './taskDashboardData'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  active =1;
  constructor() { }

  ngOnInit(): void {
  }
  
  //Line Chart
  public MultipleChartOptions = data.lineChartOptions
  public MultipleChartData = data.lineChartData
  public MultipleChartType = data.lineChartType

  
  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;

  
  public donutData = data.DonutChartData;
}
