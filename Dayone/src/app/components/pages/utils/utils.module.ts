import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilsRoutingModule } from './utils-routing.module';
import { ColorsComponent } from './colors/colors.component';
import { FlexItemsComponent } from './flex-items/flex-items.component';
import { HeightComponent } from './height/height.component';
import { BorderComponent } from './border/border.component';
import { DislayComponent } from './dislay/dislay.component';
import { MarginComponent } from './margin/margin.component';
import { PaddingComponent } from './padding/padding.component';
import { TyphographyComponent } from './typhography/typhography.component';
import { WidthComponent } from './width/width.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ColorsComponent,
    FlexItemsComponent,
    HeightComponent,
    BorderComponent,
    DislayComponent,
    MarginComponent,
    PaddingComponent,
    TyphographyComponent,
    WidthComponent
  ],
  imports: [
    CommonModule,
    UtilsRoutingModule,
    SharedModule
  ]
})
export class UtilsModule { }
