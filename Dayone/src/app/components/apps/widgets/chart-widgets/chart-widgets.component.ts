import { Component, OnInit } from '@angular/core';
import * as data from 'src/app/shared/data/widgets/chart-widgets'

@Component({
  selector: 'app-chart-widgets',
  templateUrl: './chart-widgets.component.html',
  styleUrls: ['./chart-widgets.component.scss']
})
export class ChartWidgetsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public ApexSparklines1:Partial<any> | any = data.ApexSparklines1;
  public ApexSparklines2:Partial<any> | any = data.ApexSparklines2;
  public ApexSparklines3:Partial<any> | any = data.ApexSparklines3;
  public ApexSparklines4:Partial<any> | any = data.ApexSparklines4;
  
  public ApexData1:Partial<any> | any = data.ApexData1;
  public ApexData2:Partial<any> | any = data.ApexData2;
  public ApexData3:Partial<any> | any = data.ApexData3;
    

  public lineChartOptions = data.lineChartOptions
  public lineChartType = data.lineChartType
  public lineChartData = data.lineChartData
  public lineChartData1 = data.lineChartData1
  public lineChartData2 = data.lineChartData2
  public lineChartData3 = data.lineChartData3
}
