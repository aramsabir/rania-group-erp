import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FileAttachmentsComponent } from './file-attachments/file-attachments.component';
import { FileDetailsComponent } from './file-details/file-details.component';
import { FileManager01Component } from './file-manager01/file-manager01.component';
import { FileManager02Component } from './file-manager02/file-manager02.component';

const routes: Routes = [
  {
    path: 'file-manager',
    children: [
      {
        path: 'file-manager01',
        component: FileManager01Component
      },
      {
        path: 'file-manager02',
        component: FileManager02Component
      },
      {
        path: 'file-attachments',
        component: FileAttachmentsComponent
      },
      {
        path: 'file-details',
        component: FileDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileManagerRoutingModule { }
