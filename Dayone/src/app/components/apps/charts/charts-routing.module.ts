import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApexChartsComponent } from './apex-charts/apex-charts.component';
import { ChartistComponent } from './chartist/chartist.component';
import { ChartjsComponent } from './chartjs/chartjs.component';
import { EchartsComponent } from './echarts/echarts.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'apex-charts',
        component: ApexChartsComponent
      },
      {
        path: 'echarts',
        component: EchartsComponent
      },
      {
        path: 'chartjs',
        component: ChartjsComponent
      },
      {
        path: 'chartist',
        component: ChartistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
