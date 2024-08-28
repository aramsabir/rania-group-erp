import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';
import { CountersComponent } from './counters/counters.component';
import { DragulaCardComponent } from './dragula-card/dragula-card.component';
import { ImageComparsionComponent } from './image-comparsion/image-comparsion.component';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { LoadersComponent } from './loaders/loaders.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PageSessionTimeoutComponent } from './page-session-timeout/page-session-timeout.component';
import { RangeSliderComponent } from './range-slider/range-slider.component';
import { RatingComponent } from './rating/rating.component';
import { SweetAlertsComponent } from './sweet-alerts/sweet-alerts.component';
import { TimeLineComponent } from './time-line/time-line.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'dragula-card',
        component: DragulaCardComponent
      },
      {
        path: 'image-comparsion',
       component: ImageComparsionComponent
      },
      {
        path: 'image-crop',
        component: ImageCropComponent
      },
      {
        path: 'page-sessiontimeout',
        component: PageSessionTimeoutComponent
      },
      {
        path: 'notifications',
        component: NotificationsComponent
      },
      {
        path: 'sweet-alerts',
        component: SweetAlertsComponent
      },
      {
        path: 'range-slider',
        component: RangeSliderComponent
      },
      {
        path: 'counters',
        component: CountersComponent
      },
      {
        path: 'loaders',
        component: LoadersComponent
      },
      {
        path: 'time-line',
        component: TimeLineComponent
      },
      {
        path: 'rating',
        component: RatingComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
