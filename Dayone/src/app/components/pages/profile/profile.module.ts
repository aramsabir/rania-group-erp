import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { Profiles01Component } from './profiles01/profiles01.component';
import { Profiles02Component } from './profiles02/profiles02.component';
import { Profiles03Component } from './profiles03/profiles03.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    Profiles01Component,
    Profiles02Component,
    Profiles03Component
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgbModule
  ]
})
export class ProfileModule { }
