import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FaqsComponent } from './faqs/faqs.component';
import { TermsComponent } from './terms/terms.component';
import { EmptyPagesComponent } from './empty-pages/empty-pages.component';
import { SearchComponent } from './search/search.component';
import { ProfileModule } from './profile/profile.module';
import { BlogModule } from './blog/blog.module';
import { EmailModule } from './email/email.module';
import { InvoiceModule } from './invoice/invoice.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';
import { NotifyListComponent } from './notify-list/notify-list.component';
import { LightboxModule } from 'ng-gallery/lightbox';
import { GalleryModule } from 'ng-gallery';

@NgModule({
  declarations: [
    EditProfileComponent,
    GalleryComponent,
    FaqsComponent,
    TermsComponent,
    EmptyPagesComponent,
    SearchComponent,
    AboutComponent,
    SettingsComponent,
    NotifyListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ProfileModule,
    NgSelectModule,
    NgbModule,
    BlogModule,
    EmailModule,
    InvoiceModule,
    SharedModule,
    GalleryModule.withConfig({
      // thumbView: 'contain',
    }),
    LightboxModule,
  ]
})
export class PagesModule { }
