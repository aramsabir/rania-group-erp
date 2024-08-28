import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { environment } from 'src/environments/environment';
import { ApiMethod } from '../../service/apis';
import { HttpService } from '../../service/http/http.service';
import { DicService } from '../../service/dic/dic.service';
import { TitleCasePipe } from '@angular/common';
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
  selector: 'app-show-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
})
export class ShowDataTableComponent implements OnInit {
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

  length: any = 0;

  @Input() url: any;
  @Input() customForm: any;
  @Input() insertForm: any;
  @Input() titlePage: any;
  @Input() actionRoute: any;
  @Input() params: any = {};
  @Input() columns: any = [];
  @Input() pg_header: any = [];
  @Input() size: any;

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private ngxNotifierService: NgxNotifierService,
    private modalService: NgbModal,
    private _notifications: NotificationsService,
    private dic: DicService,
    private activated_route: ActivatedRoute,
    private httpService: HttpService
  ) {
    this.lang = localStorage.getItem('language');

    this.activated_route.queryParams.subscribe((params: any) => {
      this.params.sort = params.sort;
      this.params.skip = +params.skip;
      this.params.limit = params.limit;
      this.params.search = params.search;
      this.params.cond = params.cond;
      this.page = this.params.skip / this.params.limit + 1;

      this.sortField;
      this.sortType = true;
      // if (this.params?.sort[0] == '-') {
      //   this.sortField = this.params.sort.substring(1);
      //   this.sortType = false; //- is equall to false
      // } else {
      //   this.sortField = this.params.sort;
      //   this.sortType = true; //- is equall to true
      // }
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
        part: this.params.part,
        search: this.params.search,
        cond: this.params.cond,
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
        part: this.params.part,
        search: this.params.search,
        cond: this.params.cond,
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
    }
    this.params.sort = (this.sortType ? '' : '-') + this.sortField;
    this.router.navigate([], {
      queryParams: {
        skip: this.params.skip,
        limit: this.params.limit,
        sort: this.params.sort,
        part: this.params.part,
        search: this.params.search,
        cond: this.params.cond,
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
        part: this.params.part,
        search: this.params.search,
        cond: this.params.cond,
        _id: this.params._id,
      },
    });
  }

  newPage() {
    this.router.navigate([this.insertForm.url]);
  }

  // routeToDetail(data: any) {
  //   this.router.navigate([this.part + '/detail'], { queryParams: { _id: data._id, skip: 0, limit: 30, sort: '-created_at' }, })
  // }

  getData() {
    this.httpService
      .call(this.url, ApiMethod.GET, {
        skip: this.params.skip,
        limit: this.params.limit,
        sort: this.params.sort,
        part: this.params.part,
        search: this.params.search,
        cond: this.params.cond,
        _id: this.params._id,
      })
      .subscribe((res: any) => {
        this.settingForm?.patchValue({ loading: false });
        if (res.status) {
          // console.log(res.data);

          this.rows = res.data;
          this.length = res.count;
        }
      });
  }

  ngOnInit(): void {
    if (this.url) {
      this.title_page = this.params.part
        ? this.dic.translate(
            `${this.titleCasePipe.transform(this.titlePage)} management`
          ) +
          ` - ${this.dic.translate(
            this.titleCasePipe.transform(this.params.part)
          )}`
        : this.dic.translate(`${this.titlePage} management`);

      // this.title_page = this.dic.translate(`${this.titleCasePipe.transform(this.url)} management`)
      this.getData();
    }

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
        case 'password':
          el[keyName] = '';
          break;
        default:
          keyName = 'value';
          break;
      }

      const pros = pro.split('.');

      switch (pros.length) {
        case 1:
          el[keyName] = res[pro];
          break;
        case 2:
          el[keyName] = res[pros[0]][pros[1]];
          break;
      }
    }
    this.customForm.data.fields = data;
    // this.dataForm = this.formBuilder.array([
    //   this.formBuilder.group(data),
    // ])
  }

  showModal(largemodal: any, type: any): void {
    type == 'edit' ? (this.editModal = true) : (this.addModal = true);
    this.modalService.open(largemodal, { size: 'lg' });
  }

  handleOk(type: any): void {
    this.isConfirmLoadingEdit = true;
    setTimeout(() => {
      type == 'edit' ? (this.editModal = false) : (this.addModal = false);
      this.isConfirmLoadingEdit = false;
      this.submitForm();
    }, 1000);
  }

  handleCancel(type: any): void {
    type == 'edit' ? (this.editModal = false) : (this.addModal = false);
    this.customForm = this.insertForm;
  }

  WarningOpen(warningmodal: any, item: any) {
    this.modalService.open(warningmodal, { centered: true });
    this.itemForDelete = item;
  }

  deleteItem() {
    this.httpService
      .call(`${this.actionRoute}`, ApiMethod.DELETE, {
        _id: this.itemForDelete._id,
      })
      .subscribe((res: any) => {
        if (res.status) {
          this.createToast('success', res.message);

          this.ngOnInit();
        } else {
          this.createToast('warning', res.message);
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
            // this.customForm = this.insertForm
            if (res.status) {
            } else {
              this.customForm = this.insertForm;
            }
          });
        break;
      } else if (el.type == 'number') el.value = 0;
      else el.value = '';
    }
  }

  loadData() {
    this.customForm = this.insertForm;

    this.loadUrls(this.customForm.data.fields);
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

  submitForm() {
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
        this.customForm.data._id ? ApiMethod.PUT : ApiMethod.POST,
        this.customForm.data._id ? { _id: this.customForm.data._id } : {},
        this.customForm.data
      )
      .subscribe((res: any) => {
        var close = document.getElementById(
          this.customForm.data._id ? 'closeUpdate' : 'closeInsert'
        );
        this.customForm = this.insertForm;
        this.ngOnInit();
        delete this.customForm.data._id;
        if (res.status) {
          close?.click();
          this.createToast('success', res.message);
          // this.messageService.create('success', res.message);
        } else {
          // this.messageService.create('error', res.message);
        }
      });
  }

  createToast(style: any, message: any): void {
    // this.ngxNotifierService.createToast( message,style, 5000);
    var temp = {
      timeOut: 10000,
      showProgressBar: true,
      pauseOnHover: true,
      clickToClose: true,
      animate: 'fromRight',
    };
    this._notifications.create('Notification', message, style, temp);
  }
}
