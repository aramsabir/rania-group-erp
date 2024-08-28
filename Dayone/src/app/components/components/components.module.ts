import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { CalendarComponent } from './calendar/calendar.component';
import { DragulaCardComponent } from './dragula-card/dragula-card.component';
import { ImageComparsionComponent } from './image-comparsion/image-comparsion.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { PageSessionTimeoutComponent } from './page-session-timeout/page-session-timeout.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SweetAlertsComponent } from './sweet-alerts/sweet-alerts.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { CountersComponent } from './counters/counters.component';
import { LoadersComponent } from './loaders/loaders.component';
import { RatingComponent } from './rating/rating.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { ChatModule } from './chat/chat.module';
import { ContactModule } from './contact/contact.module';
import { FileManagerModule } from './file-manager/file-manager.module';
import { TodoListModule } from './todo-list/todo-list.module';
import { UserListModule } from './user-list/user-list.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { NgxNotifierModule } from 'ngx-notifier';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxStarRatingModule } from 'ngx-star-rating';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

import {NgxImageComparisonSliderModule} from 'ngx-image-comparison-slider';
import { ImageCropperModule } from 'ngx-image-cropper';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
import { ClipboardModule } from 'ngx-clipboard';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    CalendarComponent,
    DragulaCardComponent,
    ImageComparsionComponent,
    ImageCropComponent,
    PageSessionTimeoutComponent,
    NotificationsComponent,
    SweetAlertsComponent,
    RangeSliderComponent,
    CountersComponent,
    LoadersComponent,
    RatingComponent,
    TimeLineComponent
  ],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ChatModule,
    ContactModule,
    FileManagerModule,
    TodoListModule,
    UserListModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    SharedModule,
    PerfectScrollbarModule,
    NgbModule,
    DragulaModule.forRoot(),
    ClipboardModule,
    NgxImageComparisonSliderModule,
    NgxNotifierModule,
    MatFormFieldModule, MatInputModule, MatSelectModule,MatSnackBarModule,
    SweetAlert2Module,
    NgxSliderModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ImageCropperModule,
    NgSelectModule
  ], 
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class ComponentsModule { }
