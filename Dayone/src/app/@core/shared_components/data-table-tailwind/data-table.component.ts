import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ApiMethod } from '../../service/apis';
import { HttpService } from '../../service/http/http.service';
import { DicService } from '../../service/dic/dic.service';
import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxNotifierService } from 'ngx-notifier';
import { NotificationsService } from 'angular2-notifications';

interface Setting {
  bordered: boolean;
  loading: boolean;
  pagination: boolean;
  sizeChanger: boolean;
  title: boolean;
  header: boolean;
  footer: boolean;
  expandable: boolean;
  checkbox: boolean;
  fixHeader: boolean;
  noResult: boolean;
  ellipsis: boolean;
  simple: boolean;
}

@Component({
  selector: 'app-data-table-tailwind',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  providers: [DatePipe,DecimalPipe],
})
export class DataTableTailwindComponent implements OnInit {
  settingForm?: FormGroup;
  // rows: readonly ItemData[] = [];
  // displayData: readonly ItemData[] = [];
  allChecked = false;
  indeterminate = false;
  fixedColumn = false;
  scrollX: string | null = null;
  scrollY: string | null = null;
  settingValue!: Setting;

  queryParams: any = {};
  from: any;
  to: any;
  pageSizeOptions: any = [5, 10, 20, 50, 100];
  pageSize = 10;
  pageIndex: any;
  message: any = '';
  length: any = 0;

  @Input() url: any;
  @Input() hasSearch: boolean = true;
  @Input() imgUrl: any;
  @Input() imgUploadUrl: any;
  @Input() customForm: any;
  @Input() insertForm: any;
  @Input() titlePage: any;
  @Input() actionRoute: any;
  @Input() params: any = {};
  @Input() columns: any = [];
  @Input() pg_header: any = [];

  rows: any = [];

  ApiUrl: any = environment.apiUrl;
  editModal: boolean = false;
  addModal: boolean = false;
  isConfirmLoadingEdit: boolean = false;

  title_page: any = ``;
  dataForm: FormGroup | any;
  sortField: any;
  sortType: any;
  titleCasePipe = new TitleCasePipe();
  lang: any;
  itemForDelete: any = {};
  page: number = 0;
  itemForCancel: any = {};
  apiIMG: string;
  DataIsLoading: boolean = false;
  isLoading: boolean = false;
  model: any = {};
  detailModalItem: any;
  list_item: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private datePipe: DatePipe,
    private modalService: NgbModal,
    private _notifications: NotificationsService,
    private dic: DicService,
    private activated_route: ActivatedRoute,
    private httpService: HttpService,
  ) {
    this.list_item = localStorage.getItem('list_type');
    if (!this.list_item) this.list_item = 'list';

    
    this.lang = localStorage.getItem('language');
    this.apiIMG = environment.apiIMG;
    this.activated_route.queryParams.subscribe((params: any) => {
      this.params.sort = params.sort;
      this.params.skip = +params.skip;
      this.params.limit = params.limit;
      this.params.search = params.search;
      this.params.from = params.from;
      this.params.to = params.to;
      this.params.company_id = params.company_id;
      this.params.emp_id = params.emp_id;
      this.params.subject_id = params.subject_id;
      this.params.type = params.type;
      this.params.contractor_id = params.contractor_id;
      this.params.warning_reason_id = params.warning_reason_id;
      this.params.warned_type = params.warned_type;
      this.params.warning_type_id = params.warning_type_id;
      this.params._id = params._id;
      this.page = this.params.skip / this.params.limit + 1;

      this.sortField;
      this.sortType = true;
      if (this.params.sort !== undefined) {
        if (this.params.sort[0] == '-') {
          this.sortField = this.params.sort.substring(1);
          this.sortType = false; //- is equall to false
        } else {
          this.sortField = this.params.sort;
          this.sortType = true; //- is equall to true
        }
      }
      this.params.sort = (this.sortType ? '' : '-') + this.sortField;
    });
    activated_route.queryParams.subscribe(() => {
      this.ngOnInit();
    });
  }

  parseInteger(data: any) {
    return parseInt(data);
  }

  onPageIndexChange(event: any) {
    this.router.navigate([], {
      queryParams: {
        skip: (event - 1) * this.params.limit,
        limit: this.params.limit,
        sort: this.params.sort,
        search: this.params.search,
        from: this.params.from,
        to: this.params.to,
        company_id: this.params.company_id,
        subject_id: this.params.subject_id,
        type: this.params.type,
        emp_id: this.params.emp_id,
        contractor_id: this.params.contractor_id,
        warning_reason_id: this.params.warning_reason_id,
        warned_type: this.params.warned_type,
        warning_type_id: this.params.warning_type_id,
        _id: this.params._id
      },
    });
  }
  goToLink(head: any) {
    this.router.navigate([head.link], { queryParams: head.params });
  }
  goToCurrent() {
    this.router.navigate([], {
      queryParams: {
        skip: 0,
        limit: 20,
        sort: '-created_at',
        _id: this.params._id,
        search: this.params.search,
        from: this.params.from,
        to: this.params.to,
        company_id: this.params.company_id,
        emp_id: this.params.emp_id,
        subject_id: this.params.subject_id,
        type: this.params.type,
        contractor_id: this.params.contractor_id,
        warning_reason_id: this.params.warning_reason_id,
        warned_type: this.params.warned_type,
        warning_type_id: this.params.warning_type_id,
      },
    });
  }
  search() {
    this.router.navigate([], { queryParams: this.params });
  }
  print(item: any, url: string) {
    // window.location.href = `${url}?_id=${item._id}`
    window.open(`${url}?_id=${item._id}`, '_blank');
  }
  sortBy(v: any) {
    this.sortField;
    this.sortType = true;
    if (this.params.sort[0] == '-') {
      this.sortField = this.params.sort.substring(1);
      this.sortType = false;
    } else {
      this.sortField = this.params.sort;
      this.sortType = true;
    }

    if (v == this.sortField) {
      this.sortType = !this.sortType;
    } else {
      this.sortField = v;
      this.params.sort = v;
    }
    this.params.sort = (this.sortType ? '' : '-') + this.sortField;
    this.router.navigate([], {
      queryParams: {
        skip: this.params.skip,
        limit: this.params.limit,
        sort: this.params.sort,
        search: this.params.search,
        from: this.params.from,
        to: this.params.to,
        company_id: this.params.company_id,
        subject_id: this.params.subject_id,
        type: this.params.type,
        emp_id: this.params.emp_id,
        contractor_id: this.params.contractor_id,
        warning_reason_id: this.params.warning_reason_id,
        warned_type: this.params.warned_type,
        warning_type_id: this.params.warning_type_id,
        _id: this.params._id,
      },
    });
  }

  onPageSizeChange(event: any) {
    this.router.navigate([], {
      queryParams: {
        skip: this.params.skip,
        limit: event,
        sort: this.params.sort,
        search: this.params.search,
        from: this.params.from,
        to: this.params.to,
        company_id: this.params.company_id,
        subject_id: this.params.subject_id,
        type: this.params.type,
        emp_id: this.params.emp_id,
        contractor_id: this.params.contractor_id,
        warning_reason_id: this.params.warning_reason_id,
        warned_type: this.params.warned_type,
        warning_type_id: this.params.warning_type_id,
        _id: this.params._id,
      },
    });
  }


  setListToSTorage(type: string) {
    localStorage.setItem('list_type', type);
  }

  changeActiveUser(item: any, event: any) {
    var data = { active: event.target.checked, _id: item._id };
    this.httpService
      .call('update-employee-activation', ApiMethod.PUT, {}, data)
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.ngOnInit();
          // document.getElementById('alert').click();

          this.httpService.createToast('success', ptr.message)

        }
      });
  }

  resetPassword(item: any) {
    this.httpService
      .call('resetpassword', ApiMethod.POST, {}, { _id: item._id })
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.ngOnInit();
          this.httpService.createToast('success', ptr.message)
        } else {
          this.httpService.createToast('error', ptr.message)
        }
      });
  }

  newPage() {
    this.router.navigate([this.insertForm.url]);
  }

  // routeToDetail(data: any) {
  //   this.router.navigate([this.part + '/detail'], { queryParams: { _id: data._id, skip: 0, limit: 30, sort: '-created_at' }, })
  // }

  getData() {
    this.DataIsLoading = true;
    var paramiters ={
      skip: this.params.skip,
      limit: this.params.limit,
      sort: this.params.sort,
      search: this.params.search,
      from: this.params.from,
      to: this.params.to,
      company_id: this.params.company_id,
      subject_id: this.params.subject_id,
      type: this.params.type,
      emp_id: this.params.emp_id,
      contractor_id: this.params.contractor_id,
      warning_reason_id: this.params.warning_reason_id,
      warned_type: this.params.warned_type,
      warning_type_id: this.params.warning_type_id,
      _id: this.params._id ? this.params._id : '',
    }
    this.httpService
      .call(this.url, ApiMethod.GET, paramiters)
      .subscribe((res: any) => {
        this.DataIsLoading = false
        this.settingForm?.patchValue({ loading: false });
        if (res.status) {
          this.rows = res.data;
          this.length = res.count;
        } else {
          this.rows = [];
          this.length = 0;
        }
      });
  }

  ngOnInit(): void {
    if (this.url)
      this.getData();
    this.rows = this.rows;
  }

  checkList: any = {};

  formSetValues(data: any, parent: string, res: any) {
    let pro = '';
    for (const el of this.customForm.data.fields) {
      if (parent === '') {
        pro = el.name;
      } else {
        pro = `${parent}.${el.name}`;
      }

      let keyName = '';
      switch (el.type) {
        case 'selectLocal':
          keyName = 'selected';
          break;
        case 'selectUrl':
          keyName = 'selected';
          break;
        case 'selectUrlImg':
          keyName = 'selected';
          break;
        case 'password':
          el[keyName] = '';
          break;
        default:
          keyName = 'value';
          break;
      }

      var pros: any = []
      if (pros)
        pros = pro.split('.');

      switch (pros.length) {
        case 1:
          if (el.type == 'date_time')
            el[keyName] = this.datePipe.transform(res[pro], 'yyyy-MM-ddTHH:mm');
          if (el.type == 'date')
            el[keyName] = this.datePipe.transform(res[pro], 'yyyy-MM-dd');
          else {
            el[keyName] = res[pro];
            el['value'] = res[pro];
          }
          break;

        case 2:
          el[keyName] = res[pros[0]][pros[1]];
      }
    }
    this.customForm.data.fields = data;

    // this.dataForm = this.formBuilder.array([
    //   this.formBuilder.group(data),
    // ])
  }

  showModal(largemodal: any, type: any): void {
    this.message = ''
    type == 'edit' ? (this.editModal = true) : (this.addModal = true);
    this.modalService.open(largemodal, { size: 'lg' });
  }

  modalDetail(item: any, detailModal: any) {
    this.detailModalItem = item
    this.modalService.open(detailModal, { size: 'lg' });
  }

  appendFormData(object: any) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));

    if (this.attachment)
      formData.append("file", this.attachment, this.attachment.name);

    return formData;
  }

  attachment!: File;
  modelAttahment: any = {};
  fileURL: any;
  form: any;

  changeImg(event: any) {
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

  uploadImg() {
    this.isLoading = true;
    var form = this.appendFormData(this.modelAttahment);

    if (
      !['jpeg', 'JPEG', 'PNG', 'png', 'jpg', 'JPG',].includes(this.attachment.type.split('/')[1])
    ) {
      this.isLoading = false;
      this.httpService.createToast('error', 'File not allowed');
    } else {
      // this.modelAttahment._id = this.params._id;
      this.httpService
        .call(
          this.imgUploadUrl,
          ApiMethod.PUT,
          { ...this.model },
          form
        )
        .subscribe(
          (res: any) => {
            this.isLoading = false;
            if (res.status) {
              this.httpService.createToast('success', res.message);
              this.model = {}
              document.getElementById('imgClose')?.click()
              this.ngOnInit()
              // this.router.navigate([], { queryParams: this.p })
            } else {
              this.httpService.createToast('error', res.message);
            }
          },
          (error: any) => {
            this.isLoading = false;
            this.httpService.createToast('error', error);
          }
        );
    }

  }
  openImageUpload(modal: any, model: any) {
    // console.log(model);
    this.model = model;

    this.modalService.open(modal, { size: 'lg' })
  }



  handleOk(type: any): void {
    this.isConfirmLoadingEdit = true;
    setTimeout(() => {
      type == 'edit' ? (this.editModal = false) : (this.addModal = false);
      this.isConfirmLoadingEdit = false;
      this.submitForm(type);
    }, 10);
  }

  handleCancel(type: any): void {
    type == 'edit' ? (this.editModal = false) : (this.addModal = false);
    this.customForm = type == 'edit' ? this.customForm : this.insertForm;
    this.isLoading = false
  }

  WarningOpen(warningmodal: any, item: any) {
    this.modalService.open(warningmodal, { centered: true });
    this.itemForDelete = item;
  }

  WarningCancelOpen(warnincancelgmodal: any, item: any, url: any) {
    this.modalService.open(warnincancelgmodal, { centered: true });
    // console.log(item);

    this.itemForCancel = {
      id: item._id,
      url: url,
    };
  }

  cancelItem() {
    this.httpService
      .call(`${this.itemForCancel.url}`, ApiMethod.DELETE, {
        _id: this.itemForCancel.id,
      })
      .subscribe((res: any) => {
        if (res.status) {
          this.httpService.createToast('success', res.message);

          this.ngOnInit();
        } else {
          this.httpService.createToast('error', res.message);
        }
      });
  }
  deleteItem() {
    this.httpService
      .call(`${this.actionRoute}`, ApiMethod.DELETE, {
        _id: this.itemForDelete._id,
      })
      .subscribe((res: any) => {
        if (res.status) {
          this.httpService.createToast('success', res.message);

          this.ngOnInit();
        } else {
          this.httpService.createToast('error', res.message);
        }
      });
  }

  showConfirm(element: any): void {
    // this.confirmModalDelete = this.modal.error({
    //   nzOkText: this.dic.translate('Approve'),
    //   nzOkType: 'primary',
    //   nzOkDanger: true,
    //   nzIconType: 'delete',
    //   nzCancelText: this.dic.translate('Cancel'),
    //   nzTitle: this.dic.translate('Do you want to delete these data?'),
    //   nzContent: this.dic.translate(
    //     'When you approve it, this Data will be deleted'
    //   ),
    //   nzOnOk: () =>
    //     this.httpService
    //       .call(`${this.actionRoute}`, ApiMethod.DELETE, {
    //         _id: element._id,
    //       })
    //       .subscribe((res: any) => {
    //         if (res.status) {
    //           this.messageService.create('success', res.message);
    //           this.ngOnInit();
    //         } else {
    //           this.messageService.create('error', res.message);
    //         }
    //       }),
    // });
  }

  detail(item: any, url: any) {
    this.router.navigate([url], { queryParams: { _id: item._id } });
  }

  edit(item: any) {
    // this.customForm = this.inserForm
    this.loadUrls(this.customForm.data.fields);
    this.httpService
      .call(`${this.actionRoute}`, ApiMethod.GET, { _id: item._id })
      .subscribe(
        (res: any) => {
          this.formSetValues(this.customForm.data.fields, '', res.data);
          this.customForm.data._id = item._id;
        },
        (err) => {
          console.warn(err);
        }
      );
  }

  loadUrls(fields: any) {
    for (const el of fields) {
      if (el.type == 'selectUrl') {
        this.httpService
          .call(`${el.url}`, ApiMethod.GET, el.params, this.customForm.data)
          .subscribe((res: any) => {
            el.list = res.data;
            // if (el.url === 'roles') {
            //   el.list = el.list.map(e => {
            //     return { value: e._id, name: e.title }
            //   })
            // }
            // this.customForm = this.insertForm
            if (res.status) {
            } else {
              // this.customForm = this.insertForm;
            }
          });
      } else if (el.type == 'selectUrlImg') {
        this.httpService
          .call(`${el.url}`, ApiMethod.GET, el.params, this.customForm.data)
          .subscribe((res: any) => {
            el.list = res.data;
            // if (el.url === 'roles') {
            //   el.list = el.list.map(e => {
            //     return { value: e._id, name: e.title }
            //   })
            // }
            // this.customForm = this.insertForm
            if (res.status) {
            } else {
              // this.customForm = this.insertForm;
            }
          });
      } else if (el.type == 'number') el.value = 0;
      else el.value = '';
    }
  }

  loadData() {
    // this.customForm = this.insertForm;

    // this.loadUrls(this.customForm.data.fields);
    this.loadUrls(this.insertForm.data.fields);
  }

  // generateForm(form: any, fields: any) {

  //   for (const el of fields) {

  //     switch (el.type) {
  //       case 'group': {
  //         const newForm = {};
  //         const tmpForm = this.generateForm(newForm, el.fields);
  //         form[el.name] = this.formBuilder.group(tmpForm);
  //         break;
  //       }
  //       case 'selectLocal': {
  //         form[el.name] = el.selected;
  //         break;
  //       }
  //       case 'number': {
  //         form[el.name] = new FormControl({ value: el.value, disabled: el.disabled })
  //         break;
  //       }
  //       default:
  //         if (el.required) {
  //           form[el.name] = [el.value, Validators.required];
  //         } else {
  //           form[el.name] = [el.value];
  //         }
  //     }
  //   }

  //   return form;
  // }

  // loadUrls(fields: any) {
  //   for (const el of fields) {
  //     switch (el.type) {
  //       case "group": {
  //         this.loadUrls(el.fields);
  //         break;
  //       }
  //     }
  //   }
  // }

  submitForm(type: any) {
    this.isLoading = true;
    if (type == 'add') {
      this.customForm = this.insertForm;
      delete this.customForm.data._id;
    }

    if (this.customForm)
      if (this.customForm.data)
        for (
          let index = 0;
          index < this.customForm.data.fields.length;
          index++
        ) {
          const element = this.customForm.data.fields[index];
          this.customForm.data[this.customForm.data.fields[index].name] =
            this.customForm.data.fields[index].value;
        }

    this.httpService
      .call(
        `${this.actionRoute}`,
        type == 'edit' ? ApiMethod.PUT : ApiMethod.POST,
        type == 'edit' ? { _id: this.customForm.data._id } : {},
        this.customForm.data
      )
      .subscribe((res: any) => {
        this.isLoading = false;
        var close = document.getElementById(
          this.customForm.data._id ? 'closeUpdate' : 'closeInsert'
        );
        this.ngOnInit();
        if (res.status) {
          close?.click();
          this.httpService.createToast('success', res.message);
          this.message = res.message
        } else {
          this.message = res.message
          this.httpService.createToast('error', res.message);
        }
      });
  }

}
