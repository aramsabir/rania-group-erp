import { Component, OnInit } from '@angular/core';
import { CompaniesSummaryData, CompaniesSummaryType, InactiveCompaniesData, InactiveCompaniesType } from './superAdminDashboard';
import * as data from './superAdminChatCData'
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  CompaniesSummeryList: CompaniesSummaryType[];
  InactiveCompaniesList: InactiveCompaniesType[];

  constructor() { 
    this.CompaniesSummeryList = CompaniesSummaryData
    this.InactiveCompaniesList = InactiveCompaniesData
  }

  ngOnInit(): void {
  }
  
  removeCompaniesSummery(item:number){
    this.CompaniesSummeryList.map((el,ind)=>{
      if(el.id === item){
        this.CompaniesSummeryList.splice(ind,1)
      }
    })
  }
  removeInactiveCompanies(item:number){
    this.InactiveCompaniesList.map((el,ind)=>{
      if(el.id === item){
        this.InactiveCompaniesList.splice(ind,1)
      }
    })
  }
    
  // Bar Chart 1
  public barChartOptions = data.barChartOptions;
  public barChartData = data.barChartData;
  public barChartType = data.barChartType;
  public barChartPlugins = data.barChartPlugins;
}
