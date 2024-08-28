import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPagesRoutingModule } from './landing-pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { KnowledgePageComponent } from './knowledge-page/knowledge-page.component';
import { KnowledgeViewComponent } from './knowledge-view/knowledge-view.component';
import { SupportOpenTicketComponent } from './support-open-ticket/support-open-ticket.component';
import { SupportContactComponent } from './support-contact/support-contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    LandingPageComponent,
    KnowledgePageComponent,
    KnowledgeViewComponent,
    SupportOpenTicketComponent,
    SupportContactComponent
  ],
  imports: [
    CommonModule,
    LandingPagesRoutingModule,
    NgbModule,
    NgSelectModule
  ]
})
export class LandingPagesModule { }
