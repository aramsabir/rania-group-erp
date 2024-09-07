import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-attachments',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class EmployeeAttachmentsComponent implements OnInit {
  titlePage: any = 'Employee Attachments';
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    {
      icon: 'feather feather-file-text',
      route: '/employees',
      name: 'Employees',
    },
  ];
  last_page: any = 'View Employee';
  actions: any = [];
  list_item: any = '';
  params: any = {};
  page: number = 0;
  pg_header: any = [];
  dataSource: any;
  length: any;
  Allphotos: any = [];
  current: any = {};
  isLoading: boolean = false;
  delete: boolean;
  constructor(
    private dic: DicService,
    private routes: ActivatedRoute,
    private httpService: HttpService,
    private authService: AuthService,
    private metaService: SeoService,
    private modalService: NgbModal
  ) {
    this.delete = this.authService.hasPermission('document:delete');
    this.list_item = localStorage.getItem('list_type');
    this.metaService.setTitle(environment.app_title, this.titlePage);
    this.routes.queryParams.subscribe((params: any) => {
      this.params.skip = params.skip ? params.skip : 0;
      this.params.limit = params.limit ? params.limit : 30;
      this.params.sort = params.sort ? params.sort : 'created_at';
      this.params._id = params._id;
      this.page = this.params.skip / this.params.limit + 1;
      this.getData();

      this.pg_header = [
        { link: '/home', params: {}, value: 'Home' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];
    });
  }
  ngOnInit(): void {
    this.list_item = localStorage.getItem('list_type');
  }
  setListToStorage(type: string) {
    localStorage.setItem('list_type', type);
  }

  showModal(modal: any): void {
    this.modalService.open(modal, { size: 'md' });
  }
  apiEndPointShow: any = environment.apiIMG + '/documents/';

  getData() {
    this.httpService
      .call(`${'employee-documents'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.httpService.createToast('success', res.message);
            this.dataSource = res.data;
            for (let index = 0; index < this.dataSource.length; index++) {
              var el = this.dataSource[index];
            }
            this.length = res.count;
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }

  attachment!: File;
  fileURL: any;
  modelAttahment: any = {};

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
    this.isLoading = true;
    this.modelAttahment.employee_id = this.params._id;
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
        'vnd.openxmlformats-officedocument.presentationml.presentation',
        'vnd.openxmlformats-officedocument.wordprocessingml.document',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'csv',
      ].includes(this.attachment.type.split('/')[1])
    ) {
      this.httpService.createToast('error', 'File not allowed');
      this.isLoading = false;
    } else {
      this.httpService
        .call(`${'document'}`, ApiMethod.POST, {}, form)
        .subscribe(
          (res: any) => {
            if (res.status) {
              this.httpService.createToast('success', res.message);
              document.getElementById('closeAdd')!.click();
              this.getData();
            } else {
              this.httpService.createToast('error', res.message);
            }
            this.isLoading = false;
          },
          (error: any) => {
            this.isLoading = false;
            this.httpService.createToast('error', error);
          }
        );
    }
  }
  downloadFile(data: any) {
    let link = `${environment.apiUrl}/download-document?file_name=${data}`;
    window.location.href = link;
  }
  deleteIMG(item: any): any {
   if(confirm('Are you sure you want to delete')){
    this.httpService
    .call(`${'document'}`, ApiMethod.DELETE, { _id: item._id })
    .subscribe((ptr: any) => {
      if (ptr.status) {
        this.getData()
        this.httpService.createToast('success', ptr.message);
      } else {
        this.httpService.createToast('error', ptr.message);
      }
    });
    }
  }

  showPhoto(item: any) {
    this.current = item;
  }

  getttachmentExtention(item: any) {
    var ext = 'image';
    if (item)
      if (
        item.split('.')[item.split('.').length - 1] == 'pdf' ||
        item.split('.')[item.split('.').length - 1] == 'PDF'
      ) {
        ext = 'pdf';
      } else
      if (
        item.split('.')[item.split('.').length - 1] == 'pptx' 
      ) {
        ext = 'pptx';
      } else if (
        item.split('.')[item.split('.').length - 1] == 'xlsx' ||
        item.split('.')[item.split('.').length - 1] == 'csv'
      ) {
        ext = 'xslx';
      } else if (
        item.split('.')[item.split('.').length - 1] == 'png' ||
        item.split('.')[item.split('.').length - 1] == 'jpeg' ||
        item.split('.')[item.split('.').length - 1] == 'jpg'
      ) {
        ext = 'image';
      } else {
        ext = 'file';
      }
    return ext;
  }
}
