import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { AttendanceRoutingModule } from './attendance-routing.module';
import { AttendenceListComponent, NgbdModal1Content, NgbdModal2Content, NgbdModalHalfDayContent, NgbdModalHalfDaySecondContent } from './attendence-list/attendence-list.component';
import { AttendenceByUserComponent } from './attendence-by-user/attendence-by-user.component';
import { AttendenceViewComponent } from './attendence-view/attendence-view.component';
import { AttendenceMarkComponent } from './attendence-mark/attendence-mark.component';
import { OverviewCalendarComponent } from './overview-calendar/overview-calendar.component';
import { LeaveSettingsComponent } from './leave-settings/leave-settings.component';
import { LeaveApplicationsComponent } from './leave-applications/leave-applications.component';
import { RecentLeavesComponent } from './recent-leaves/recent-leaves.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AttendanceViewService } from './attendence-view/attendence-view.service';
import { AttendanceByUserService } from './attendence-by-user/attendence-by-user.service';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

@NgModule({
  declarations: [
    AttendenceListComponent,
    AttendenceByUserComponent,
    AttendenceViewComponent,
    AttendenceMarkComponent,
    OverviewCalendarComponent,
    LeaveSettingsComponent,
    LeaveApplicationsComponent,
    RecentLeavesComponent,
    NgbdModal1Content,
    NgbdModal2Content,
    NgbdModalHalfDayContent,
    NgbdModalHalfDaySecondContent
  ],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    NgCircleProgressModule.forRoot({"responsive": true}),
    NgxMaterialTimepickerModule,
    FormsModule, ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    AttendanceViewService,
    AttendanceByUserService,
    DecimalPipe
  ]
})
export class AttendanceModule { }
