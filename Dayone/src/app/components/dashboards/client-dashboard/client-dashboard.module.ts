import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDashboardRoutingModule } from './client-dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientListComponent } from './client-list/client-list.component';
import { ViewClientComponent } from './view-client/view-client.component';
import { NewClientComponent } from './new-client/new-client.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    DashboardComponent,
    ClientListComponent,
    ViewClientComponent,
    NewClientComponent,
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClientDashboardRoutingModule,
    SharedModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule,
    NgChartsModule,
    NgApexchartsModule,
    DlDateTimeDateModule,
    DlDateTimePickerModule,
    AngularEditorModule
  ]
})
export class ClientDashboardModule { }
