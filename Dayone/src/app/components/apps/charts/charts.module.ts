import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ApexChartsComponent } from './apex-charts/apex-charts.component';
import { EchartsComponent } from './echarts/echarts.component';
import { ChartistComponent } from './chartist/chartist.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import { ChartistModule } from 'ng-chartist';
import { NgChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ApexChartsComponent,
    EchartsComponent,
    ChartistComponent,
    ChartjsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    SharedModule,
    NgApexchartsModule,
    NgChartsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    ChartistModule
  ]
})
export class ChartSModule { }
