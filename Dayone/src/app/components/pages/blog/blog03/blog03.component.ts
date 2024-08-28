import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blog03',
  templateUrl: './blog03.component.html',
  styleUrls: ['./blog03.component.scss', '../../../apps/forms/form-editor/form-editor.component.scss'],
})
export class Blog03Component implements OnInit {
  constructor(
    private modalService: NgbModal) {}

  ngOnInit(): void {}

  // dropzone
  files: File[] = [];
  filesPreview: File[] = [];
  filesDisabled: File[] = [];
  disable = true;

  onSelect(event) {
    // console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    // console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  onPreviewFileSelect(event) {
    // console.log(event);
    this.filesPreview.push(...event.addedFiles);
  }

  onPreviewFileRemove(event) {
    // console.log(event);
    this.filesPreview.splice(this.filesPreview.indexOf(event), 1);
  }

  //ck Editor
  public Editor: any = ClassicEditor;
  public onReady(editor: any) {
    editor.ui.view.editable.element.parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.view.editable.element
    );
  }

  OpenEditor(editormodal: any) {
    this.modalService.open(editormodal, { centered: true, size: 'lg' });
  }
}
