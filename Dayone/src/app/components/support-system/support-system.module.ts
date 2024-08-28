import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupportSystemRoutingModule } from './support-system-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { LandingPagesModule } from './landing-pages/landing-pages.module';
import { UserPagesModule } from './user-pages/user-pages.module';
import { AgentModule } from './agent/agent.module';
import { AdminModule } from './admin/admin.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SupportSystemRoutingModule,
    AdminRoutingModule,
    LandingPagesModule,
    UserPagesModule,
    AgentModule,
    AdminModule,
    NgbModule,
    NgChartsModule,
    NgApexchartsModule
  ]
})
export class SupportSystemModule { }
