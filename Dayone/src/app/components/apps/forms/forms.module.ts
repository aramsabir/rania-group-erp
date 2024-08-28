import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsRoutingModule } from './forms-routing.module';
import { FormElementsComponent } from './form-elements/form-elements.component';
import { AdvancedElementsComponent } from './advanced-elements/advanced-elements.component';
import { FormsWizardsComponent } from './forms-wizards/forms-wizards.component';
import { FormEditorComponent } from './form-editor/form-editor.component';
import { FormElementSizesComponent } from './form-element-sizes/form-element-sizes.component';
import { FormTreeviewComponent } from './form-treeview/form-treeview.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormElementsService } from './form-elements/form-elements.service';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { FileuploadService } from './advanced-elements/fileupload.service';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { AngularDualListBoxModule } from 'angular-dual-listbox';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { ColorPickerModule } from 'ngx-color-picker';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QuillModule } from 'ngx-quill';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTreeModule } from '@angular/material/tree';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ArchwizardModule } from 'angular-archwizard';

@NgModule({
  declarations: [
    FormElementsComponent,
    AdvancedElementsComponent,
    FormsWizardsComponent,
    FormEditorComponent,
    FormElementSizesComponent,
    FormTreeviewComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsRoutingModule,
    SharedModule,
    NgSelectModule,
    FormsModule, ReactiveFormsModule,
    NgbModule,
    NgxDropzoneModule,
    NgxIntlTelInputModule,
    AngularDualListBoxModule,
    NgxMaterialTimepickerModule,
    NgxDaterangepickerMd.forRoot(),
    ColorPickerModule,
    QuillModule.forRoot(),
    CKEditorModule,
    AngularEditorModule,
    MatTreeModule, MatIconModule, MatProgressBarModule,
    ToastrModule.forRoot(
      {
        timeOut: 1000
      }
    ),
    ArchwizardModule,
  ],
  providers: [
    FormElementsService,
    FileuploadService,
    ToastrService
  ]
})
export class FormModule { }
