import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EmptyPagesComponent } from './empty-pages/empty-pages.component';
import { FaqsComponent } from './faqs/faqs.component';
import { GalleryComponent } from './gallery/gallery.component';
import { NotifyListComponent } from './notify-list/notify-list.component';
import { SearchComponent } from './search/search.component';
import { SettingsComponent } from './settings/settings.component';
import { TermsComponent } from './terms/terms.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'notify-list',
        component: NotifyListComponent
      },
      {
        path: 'edit-profile',
        component: EditProfileComponent
      },
      {
        path: 'gallery',
        component: GalleryComponent
      },
      {
        path: 'faqs',
        component: FaqsComponent
      },
      {
        path: 'terms',
        component: TermsComponent
      },
      {
        path: 'empty-pages',
        component: EmptyPagesComponent
      },
      {
        path: 'search',
        component: SearchComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
