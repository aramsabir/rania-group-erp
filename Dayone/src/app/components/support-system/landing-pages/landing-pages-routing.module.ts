import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgePageComponent } from './knowledge-page/knowledge-page.component';
import { KnowledgeViewComponent } from './knowledge-view/knowledge-view.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SupportContactComponent } from './support-contact/support-contact.component';
import { SupportOpenTicketComponent } from './support-open-ticket/support-open-ticket.component';


const routes: Routes = [
  {
    path: 'landing-pages',
    children: [
      {
        path: 'landing-page',
        component: LandingPageComponent
      },
      {
        path: 'knowledge-page',
        component: KnowledgePageComponent
      },
      {
        path: 'knowledge-view',
        component: KnowledgeViewComponent
      },
      {
        path: 'support-contact',
        component: SupportContactComponent
      },
      {
        path: 'support-open-ticket',
        component: SupportOpenTicketComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPagesRoutingModule { }
