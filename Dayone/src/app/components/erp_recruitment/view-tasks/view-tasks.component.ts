import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-tasks',
  templateUrl: './view-tasks.component.html',
  styleUrls: ['./view-tasks.component.scss', './form-editor.component.scss'],
})
export class ViewTasksComponent implements OnInit {
  active = 1;
  params: any = { _id: '' };
  model: any = { chat: [], attachments: [] };
  itemForDelete: any = {};
  userPhotoRoute: any = './assets/images/users/16.jpg';
  newComment: any = {
    title: '',
    description: '',
  };
  attachmentModel: any = {
    file_name: '',
    description: '',
  };
  isLoading: boolean = false;
  isLoadingAttachment: boolean = false;
  userInfo: any;
  endPoint: any;
  selected_item: any = {};
  resources: any = [];
  update: boolean = false;
  chat: boolean = false;
  upload_attachment: boolean = false;
  delete_attachment: boolean = false;
  notifications: any = [];
  userPhoto: any = `${environment.apiUrl}/public/profile_photos/`;
  members: any = [];
  sliderOptions: any = {};

  statusOptions: any = [
    { value: 'Pending', label: this.dic.translate('Pending'), color: 'warning' },
    { value: 'In progress', label: this.dic.translate('In progress'), color: 'secondary' },
    { value: 'Completed', label: this.dic.translate('Completed'), color: 'success' },
    { value: 'Canceled', label: this.dic.translate('Canceled'), color: 'danger' },
  ];
  priorityOptions: any = [
    { value: 'High', label: this.dic.translate('High'), color: 'danger' },
    { value: 'Medium', label: this.dic.translate('Medium'), color: 'secondary' },
    { value: 'Low', label: this.dic.translate('Low'), color: 'yellow' },
  ];
  uploadStatus: boolean= false;

  applicationsModel: any = [];
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private dic: DicService,
    private http: HttpService,
    private toasterService: ToastrService
  ) {
    this.userPhotoRoute = `${environment.apiUrl}/public/profile_photos/`;
    this.endPoint = `${environment.apiUrl}/public/task_attachments/`;

    this.http.call('userinfo', ApiMethod.GET).subscribe((ptr: any) => {
      this.userInfo = ptr.data;
      if (ptr.status)
        if (ptr.data.role_id) {
          this.resources = ptr.data.role_id.resource.split(',');
          if (this.resources.includes('task-managements:chat')) {
            this.chat = true;
          }
          if (this.resources.includes('task-managements:update')) {
            this.update = true;
          }
          if (this.resources.includes('task-managements:upload-attachment')) {
            this.upload_attachment = true;
          }
          if (this.resources.includes('task-managements:delete-attachment')) {
            this.delete_attachment = true;
          }
        }
    });
    if (this.dic.lang() == 'en')
    this.sliderOptions = {
      floor: 0,
      ceil: 100,
      step: 1,
      showSelectionBar: true,
    };
  if (this.dic.lang() != 'en')
    this.sliderOptions = {
      floor: 0,
      ceil: 100,
      step: 1,
      rtl: true,
      rightToLeft: 'rtl',
      showSelectionBar: true,
    };

    this.route.queryParams.subscribe((params) => {
      this.params._id = params['_id'];
      this.params.notification_id = params['notification_id'];
      if (params['_id']) this.getOne(params['_id']);
    });
  }

  ngOnInit(): void {}

  getOne(id: any) {
    this.http
      .call('task-management', ApiMethod.GET, {
        _id: id,
        notification_id: this.params.notification_id
          ? this.params.notification_id
          : '',
      })
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.members = ptr.members;
          this.model = ptr.data;
          this.notifications = ptr.notifications;
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
      });
  }

  statusColor(status: string) {
    if (status == 'Completed') return 'success';
    if (status == 'Canceled') return 'danger';

    if (status == 'In progress') return 'orange';
    return 'warning';
  }

  progressColor(progress: number) {
    if (progress == 100) {
      return 'success';
    } else if (progress > 75) {
      return 'success';
    } else if (progress > 50) {
      return 'warning';
    } else if (progress > 25) {
      return 'orange';
    } else {
      return 'danger';
    }
  }

  attachment!: File;
  modelAttahment: any = {};
  fileURL: any;

  appendFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    if (this.attachment)
      formData.append('file', this.attachment, this.attachment.name);
    return formData;
  }
  onAttachmentChange(event: any) {
    this.attachment = event.target.files[0];
    this.modelAttahment.file = '';
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileURL = event.target.result;
        this.modelAttahment.file = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  uploadFile() {
    var form = this.appendFormData(this.modelAttahment);

    if (
      ![
        'jpeg',
        'JPEG',
        'PNG',
        'png',
        'jpg',
        'JPG',
        'pdf',
        'PDF',
        'dwg',
        'DWG',
        'vnd.openxmlformats-officedocument.wordprocessingml.document',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'csv',
        'CSV',
      ].includes(this.attachment.type.split('/')[1])
    ) {
      this.http.createToast('error', 'File not allowed');
    } else {
      if (this.params._id) {
        // this.modelAttahment._id = this.params._id;
        this.http
          .call(
            `${'task-attachment'}`,
            ApiMethod.POST,
            { _id: this.params._id },
            form
          )
          .subscribe(
            (res: any) => {
              this.modalService.dismissAll();

              if (res.status) {
                this.http.createToast('success', res.message);
                this.getOne(this.model._id);
              } else {
                this.http.createToast('error', res.message);
              }
            },
            (error: any) => {
              this.http.createToast('error', error);
            }
          );
      }
    }
  }

  priorityColor(priority: string) {
    if (priority == 'High') return 'danger';

    if (priority == 'Medium') return 'secondary';
    return 'warning';
  }
 

  deleteAttachment(element: any): void {
    // if (confirm('Are you sure to delete this attachment')) {
    this.http
      .call(`${'task-attachment'}`, ApiMethod.DELETE, {
        _id: element._id,
      })
      .subscribe((res: any) => {
        if (res.status) {
          this.http.createToast('success', res.message);
          this.getOne(this.params._isd);
        } else {
          this.http.createToast('error', res.message);
        }
      });
    // }
  }
  getFileExtention(data: any) {
    var result = 'jpg';
    if (
      ['jpeg', 'JPEG', 'PNG', 'png', 'jpg', 'JPG'].includes(
        data.split('.')[data.split('.').length - 1]
      )
    ) {
      result = 'image';
    }
    if (['pdf', 'PDF'].includes(data.split('.')[data.split('.').length - 1])) {
      result = 'pdf';
    }
    if (
      ['vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
        data.split('.')[data.split('.').length - 1]
      )
    ) {
      result = 'doc';
    }
    if (
      [
        'vnd.openxmlformats-officedocument.wordprocessingml.document',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'csv',
        'CSV',
      ].includes(data.split('.')[data.split('.').length - 1])
    ) {
      result = 'xlsx';
    }
    return result;
  }

  downloadFile(data: any) {
    let link = `${environment.apiUrl}/download-task-attachment?file_name=${data}`;
    window.location.href = link;
  }

  showmodal(warningmodal: any) {
    this.modalService.open(warningmodal, { size: 'md' });
    this.newComment = {
      title: '',
      description: '',
    };
  }

  setDeleteItem(warningmodal: any, item: any) {
    this.selected_item = item;
    this.modalService.open(warningmodal, { size: 'md' });
    this.newComment = {
      title: '',
      description: '',
    };
  }
  showmodalAttachment(warningmodal: any) {
    this.modalService.open(warningmodal, { size: 'md' });
    this.newComment = {
      file_name: '',
    };
  }
  WarningOpen(warningmodal: any, item: any, index: any) {
    this.modalService.open(warningmodal, { centered: true });
    this.itemForDelete = item;
    this.itemForDelete.index = index;
  }

  deleteComment() {
    this.http
      .call(
        'delete-chat-task-management',
        ApiMethod.DELETE,
        {
          _id: this.model._id,
          chat_id: this.itemForDelete._id,
          index: this.itemForDelete.index,
        },
        this.newComment
      )
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.itemForDelete = null;
          this.getOne(this.model._id);
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
      });
  }
  save() {
    this.http
      .call(
        'task-management-on-view',
        ApiMethod.PUT,
        { _id: this.model._id },
        this.model
      )
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.getOne(this.model._id);
          this.toasterService.success(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
      });
  }
  addComment() {
    this.isLoading = true;
    this.http
      .call(
        'push-chat-task-management',
        ApiMethod.POST,
        { _id: this.model._id },
        this.newComment
      )
      .subscribe((ptr: any) => {
        this.isLoading = false;
        if (ptr.status) {
          this.model = ptr.data;
          document.getElementById('add-btn-close')?.click();
          this.getOne(this.model._id);
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
      });
  }
  addFile() {
    this.isLoadingAttachment = true;
    this.http
      .call(
        'push-attachment-task-management',
        ApiMethod.POST,
        { _id: this.model._id },
        this.attachmentModel
      )
      .subscribe((ptr: any) => {
        this.isLoadingAttachment = false;
        if (ptr.status) {
          this.model = ptr.data;
          document.getElementById('add-btn-close')?.click();
          this.getOne(this.model._id);
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
      });
  }



}
