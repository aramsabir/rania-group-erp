import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManager01Component } from './file-manager01/file-manager01.component';
import { FileManager02Component } from './file-manager02/file-manager02.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { FileAttachmentsComponent } from './file-attachments/file-attachments.component';
import { FileDetailsComponent } from './file-details/file-details.component';


@NgModule({
  declarations: [
    FileManager01Component,
    FileManager02Component,
    FileAttachmentsComponent,
    FileDetailsComponent
  ],
  imports: [
    CommonModule,
    FileManagerRoutingModule,
    SharedModule,
    NgbModule,
    NgCircleProgressModule.forRoot({"responsive": true}),
  ]
})
export class FileManagerModule { }
