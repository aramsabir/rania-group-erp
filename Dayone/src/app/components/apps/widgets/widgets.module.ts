import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets/widgets.component';
import { ChartWidgetsComponent } from './chart-widgets/chart-widgets.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgApexchartsModule } from 'ng-apexcharts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';

@NgModule({
  declarations: [
    WidgetsComponent,
    ChartWidgetsComponent
  ],
  imports: [
    CommonModule,
    WidgetsRoutingModule,
    SharedModule,
    NgCircleProgressModule.forRoot(),
    NgApexchartsModule,
    NgChartsModule,
    FormsModule, ReactiveFormsModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
  ]
})
export class WidgetsModule { }
