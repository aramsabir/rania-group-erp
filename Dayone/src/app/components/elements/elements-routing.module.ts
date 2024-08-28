import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './accordion/accordion.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AvatarsComponent } from './avatars/avatars.component';
import { BadgesComponent } from './badges/badges.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { CardImagesComponent } from './card-images/card-images.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { FootersComponent } from './footers/footers.component';
import { HeadersComponent } from './headers/headers.component';
import { ListComponent } from './list/list.component';
import { MediaObjectComponent } from './media-object/media-object.component';
import { ModalComponent } from './modal/modal.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PanelComponent } from './panel/panel.component';
import { PopoverComponent } from './popover/popover.component';
import { ProgressComponent } from './progress/progress.component';
import { TabsComponent } from './tabs/tabs.component';
import { TagsComponent } from './tags/tags.component';
import { TooltipsComponent } from './tooltips/tooltips.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'accordion',
        component: AccordionComponent
      },
      {
        path: 'alerts',
        component: AlertsComponent
      },
      {
        path: 'avatars',
        component: AvatarsComponent
      },
      {
        path: 'badges',
        component: BadgesComponent
      },
      {
        path: 'breadcrumb',
        component: BreadcrumbComponent
      },
      {
        path: 'buttons',
        component:  ButtonsComponent
      },
      {
        path: 'cards',
        component: CardsComponent
      },
      {
        path: 'card-images',
        component: CardImagesComponent
      },
      {
        path: 'carousel',
        component: CarouselComponent
      },
      {
        path: 'dropdown',
        component: DropdownComponent
      },
      {
        path: 'footers',
        component: FootersComponent
      },
      {
        path: 'headers',
        component: HeadersComponent
      },
      {
        path: 'lists-listgroup',
        component: ListComponent
      },
      {
        path: 'media-object',
        component: MediaObjectComponent
      },
      {
        path: 'modal',
        component: ModalComponent
      },
      {
        path: 'navigation',
        component: NavigationComponent
      },
      {
        path: 'pagination',
        component : PaginationComponent
      },
      {
        path: 'panel',
        component: PanelComponent
      },
      {
        path: 'popover',
        component: PopoverComponent
      },
      {
        path: 'progress',
        component: ProgressComponent
      },
      {
        path: 'tabs',
        component: TabsComponent
      },
      {
        path : 'tags',
        component: TagsComponent
      },
      {
        path: 'tooltips',
        component: TooltipsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }
