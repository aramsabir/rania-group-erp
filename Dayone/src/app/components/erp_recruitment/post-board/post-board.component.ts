import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService, } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-post-board',
  templateUrl: './post-board.component.html',
  styleUrls: ['./post-board.component.scss'],
})
export class ProccessBoardComponent implements OnInit {
  @ViewChild('largemodaladd') largemodaladd
  pageTitle: string = 'Recruitment Process Board';
  actions: any = [
    {
      class: 'btn btn-primary',
      icon: 'feather feather-plus',
      text: this.dic.translate('New Recruitment'),
      type: 'info',
      url: '/recruitments/new',
    },
  ];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/bas-home', name: 'Home' },
    {
      icon: 'feather feather-',
      route: '/recruitments/list',
      queryParams: {
        skip: 0,
        limit: 20,
        sort: 'date',
        from: this.datePipe.transform(
          new Date().setMonth(new Date().getMonth() - 1),
          'yyyy-MM-dd'
        ),
        to: this.datePipe.transform(new Date(), 'yyyy-MM-dd'),
      },
      name: 'Recruitments',
    },
  ];
  apiEndPoint: any = environment.apiIMG + '/cv_bank/';
  levels: any = [
    { value: 'Application', name: 'Application' },
    { value: 'Screening', name: 'Screening' },
    { value: 'Shortlist', name: 'Shortlist' },
    { value: 'Phone screen', name: 'Phone screen' },
    { value: 'Interview', name: 'Interview' },
    { value: 'Second round interview', name: 'Second round interview' },
    { value: 'Offer', name: 'Offer' },
    { value: 'Hire', name: 'Hire' },
    { value: 'Probationary', name: 'Probationary' },
  ]
  priorityOptions: any = [
    { value: 'High', label: this.dic.translate('High'), color: 'danger' },
    {
      value: 'Medium',
      label: this.dic.translate('Medium'),
      color: 'secondary',
    },
    { value: 'Low', label: this.dic.translate('Low'), color: 'yellow' },
  ];
  members: any = [];
  params: any = {
    sort: '-created_at',
    members: [],
    units: [],
    from: '',
    to: '',
    priority: '',
  };
  dataSource: any = {
    hiring_reason: '',
    Application: [],
    Screening: [],
    Shortlist: [],
    'Phone screen': [],
    Interview: [],
    'Second round interview': [],
    Offer: [],
    Hire: [],
    Probationary: []
  };
  applicationModel: any = {
    level: "Application",
    candidate_name: '',
    email: '',
    phone: '',
    is_selected: false,
    note: '',
    interview_type: 'In-person',
    reject_reason_id: '',
    offers: [
      {
        date: null,
        salary: 0,
        status: false,
        note: '',
      },
    ],
    hiring_date: null,
    joining_date: null,
    probationary_date: null,
    status: false,
  }
  reject_reasons: any = []
  editModal: boolean = false;
  addModal: boolean = false;
  isLoading: boolean = false;
  message: string = ''
  lang: string;
  uploadStatus: boolean= false;

  applicationsModel: any = [];
  BAG = 'DRAGULA_EVENTS';
  subs = new Subscription();
  public constructor(
    private dragulaService: DragulaService,
    private route: ActivatedRoute,
    private dic: DicService,
    private datePipe: DatePipe,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpService
  ) {
    this.lang = this.dic.lang()
    // this.apiEndPoint = environment.apiIMG + '/profile_photos/';
    this.http
      .call('available_employees', ApiMethod.GET, { skip: 0, lihr: 10000, sort: 'full_name' })
      .subscribe((ptr: any) => {
        this.members = ptr.data;
      });
    this.http
      .call('available_basic_datas', ApiMethod.GET, { skip: 0, lihr: 10000, sort: 'order', type: "Reject reason" })
      .subscribe((ptr: any) => {
        if (ptr.status) {

          this.reject_reasons = ptr.data.map(el => {
            return {
              value: el._id,
              label: this.lang == 'en' ? el.en_name : el.name
            }
          });
        }
      });
    this.route.queryParams.subscribe((params) => {
      this.params._id = params['_id'];
      this.getData(false);
    });
    this.subs.add(
      dragulaService.drag(this.BAG).subscribe(({ el }) => {
        // console.log(`Dragging the ${ el["id"] }!`);
        // this.removeClass(el, 'ex-moved');
      })
    );

    this.subs.add(
      dragulaService.drop(this.BAG).subscribe((el) => {

        var _id = el['el']['id'];

        var source = el.source['id'];
        var dest = el.target['id'];

        if (source != dest)
          this.http
            .call(
              'change-level-candidate',
              ApiMethod.POST,
              { _id: this.params._id },
              { level: dest, doc_id: _id }
            )
            .subscribe((ptr: any) => {
              this.getData(true, _id, dest);
              if (ptr.status) {
                this.http.createToast('success', ptr.message);
              } else {
                this.http.createToast('error', ptr.message);
              }
            });

        this.addClass(el, 'ex-moved');
      })
    );
    this.subs.add(
      dragulaService.over(this.BAG).subscribe(({ el, container }) => {
        // console.log('over', container);
        this.addClass(container, 'ex-over');
      })
    );
    this.subs.add(
      dragulaService.out(this.BAG).subscribe(({ el, container }) => {
        // console.log('out', container);
        this.removeClass(container, 'ex-over');
      })
    );
  }

  ngOnInit(): void { }
  search() {
    this.router.navigate([], { queryParams: this.params });
  }
  getData(changeDate: Boolean, _id?, dest?) {
    this.http
      .call('recruitment', ApiMethod.GET, this.params,)
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.dataSource = ptr.data;
          if (changeDate) {
            this.applicationModel = this.dataSource.applications[dest].find((el) => el._id == _id)
            this.message = `Please add ${dest} date`
            this.showModal(this.largemodaladd, 'edit', this.applicationModel)
          }
        } else {
          this.http.createToast('error', ptr.message);
        }

      });
  }

  openModal(modal: any, el?: any,) {
    this.attachment = el
    this.modalService.open(modal, { centered: true,size:"xl",  backdrop: 'static',});

  }
  
  showModalCandidate(candidate: any){
    this.modalService.open(candidate, { size: 'lg' });
  }

  showModal(largemodal: any, type: any, item?: any): void {
    type == 'edit' ? (this.editModal = true) : (this.addModal = true);
    this.modalService.open(largemodal, { size: 'lg' });
    if (type == 'edit') {
      this.editModal = true
      this.addModal = false
      this.applicationModel = item
      this.applicationModel.file_name_path = item.cv
      this.applicationModel.is_selected = 'Existing'
      if (this.applicationModel.offers.length > 0) {
        this.applicationModel.offers = this.applicationModel.offers.map(el => {
          return {
            ...el,
            date: this.datePipe.transform(el.date, 'yyyy-MM-dd')
          }
        })
      }
    } else {
      this.addModal = true;
      this.editModal = false
      this.applicationModel = {
        level: item,
        candidate_name: '',
        email: '',
        phone: '',
        is_selected: false,
        note: '',
        interview_type: 'In-person',
        reject_reason_id: '',
        offers: [
          // {
          //   date: null,
          //   salary: 0,
          //   status: false,
          //   note: '',
          // },
        ],
        hiring_date: null,
        joining_date: null,
        probationary_date: null,
        status: false,
      }
    }
  }
  handleOk(type: any): void {
    // this.isConfirmLoadingEdit = true;
    if (type == 'add') {
      this.save()
    } else if (type == 'edit') {
      this.edit()
    }
    setTimeout(() => {
      type == 'edit' ? (this.editModal = false) : (this.addModal = false);
      // this.isConfirmLoadingEdit = false;
      // this.submitForm(type);
    }, 10);
  }

  handleCancel(type: any): void {
    type == 'edit' ? (this.editModal = false) : (this.addModal = false);
    // this.isLoading = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
  addClass(el: any, classes: string) { }
  removeClass(ele: any, classes: string) { }



  file_image: string = '';
  attachment!: File;
  fileURL: any;

  onAttachmentChange(event) {
    this.attachment = event.target.files[0];
    this.applicationModel.file = '';
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.fileURL = event.target.result;
        this.applicationModel.file = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
    this.file_image = this.attachment.name;
  }

  edit() {
    console.log(this.applicationModel.is_selected);
    console.log('edit');

    if (this.applicationModel.is_selected !== 'Existing') {
      if (!this.attachment) {
        this.http.createToast('error', 'File required or not allowed');
        return
      }
      if (
        this.attachment.type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.applicationModel.file_type = 'docx';
      }
      if (
        this.attachment.type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.applicationModel.file_type = 'xlsx';
      }
      if (this.attachment.type == 'application/pdf') {
        this.applicationModel.file_type = 'pdf';
      }
      if (this.attachment.type == 'image/png') {
        this.applicationModel.file_type = 'png';
      }
      if (this.attachment.type == 'image/jpeg') {
        this.applicationModel.file_type = 'jpeg';
      }
      if (
        !['docx', 'xlsx', 'png', 'pdf', 'jpeg'].includes(this.applicationModel.file_type)
      ) {
        this.http.createToast('error', 'File required or not allowed');
      } else {
        this.isLoading = true
        this.http
          .call('update-candidate', ApiMethod.POST, { _id: this.params._id, doc_id: this.applicationModel._id }, this.applicationModel)
          .subscribe(
            (res: any) => {
              this.isLoading = false
              if (res.status) {
                this.http.createToast('success', res.message);
                this.getData(false)
                this.editModal = false
                document.getElementById('close-add')?.click()
              } else {
                this.http.createToast('error', res.message);
              }
            },
            (err: any) => {
              this.isLoading = false
              this.http.createToast('error', err.error);
              return;
            }
          );
      }

    } else {
      this.isLoading = true
      this.http
        .call('update-candidate', ApiMethod.POST, { _id: this.params._id, doc_id: this.applicationModel._id }, this.applicationModel)
        .subscribe(
          (res: any) => {
            this.isLoading = false
            if (res.status) {
              this.http.createToast('success', res.message);
              this.getData(false)
              this.editModal = false
              document.getElementById('close-add')?.click()
            } else {
              this.http.createToast('error', res.message);
            }
          },
          (err: any) => {
            this.isLoading = false
            this.http.createToast('error', err.error);
            return;
          }
        );
    }
  }
 
  save() {
    if (!this.applicationModel.is_selected) {
      if (!this.attachment) {
        this.http.createToast('error', 'File required or not allowed');
        return
      }
      if (
        this.attachment.type ==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ) {
        this.applicationModel.file_type = 'docx';
      }
      if (
        this.attachment.type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        this.applicationModel.file_type = 'xlsx';
      }
      if (this.attachment.type == 'application/pdf') {
        this.applicationModel.file_type = 'pdf';
      }
      if (this.attachment.type == 'image/png') {
        this.applicationModel.file_type = 'png';
      }
      if (this.attachment.type == 'image/jpeg') {
        this.applicationModel.file_type = 'jpeg';
      }

      if (
        !['docx', 'xlsx', 'png', 'pdf', 'jpeg'].includes(this.applicationModel.file_type)
      ) {
        this.http.createToast('error', 'File required or not allowed');
      } else {
        this.isLoading = true
        this.http
          .call('post-attachment', ApiMethod.POST, { _id: this.params._id }, this.applicationModel)
          .subscribe(
            (res: any) => {
              this.isLoading = false
              if (res.status) {
                this.http.createToast('success', res.message);
                this.getData(false)
                this.addModal = false
                document.getElementById('close-add')?.click()
              } else {
                this.http.createToast('error', res.message);
              }
            },
            (err: any) => {
              this.isLoading = false
              this.http.createToast('error', err.error);
              return;
            }
          );
      }
    } else {
      this.isLoading = true
      this.http
        .call('post-attachment', ApiMethod.POST, { _id: this.params._id }, this.applicationModel)
        .subscribe(
          (res: any) => {
            this.isLoading = false
            if (res.status) {
              this.http.createToast('success', res.message);
              this.getData(false)
              this.addModal = false
              document.getElementById('close-add')?.click()
            } else {
              this.http.createToast('error', res.message);
            }
          },
          (err: any) => {
            this.isLoading = false
            this.http.createToast('error', err.error);
            return;
          }
        );
    }
  }

  pushOffer() {
    this.applicationModel.offers.push({
      date: null,
      salary: 0,
      status: false,
      note: '',
    })
  }
  removeOffer(index: number) {
    this.applicationModel.offers.splice(index, 1)
  }

  getttachmentExtention(item: string) {
    var ext = 'image';

    if (item) {
      if (
        item.split('.')[item.split('.').length - 1] == 'pdf' ||
        item.split('.')[item.split('.').length - 1] == 'PDF'
      ) {
        ext = 'pdf';
      }
      if (
        item.split('.')[item.split('.').length - 1] == 'xlsx' ||
        item.split('.')[item.split('.').length - 1] == 'csv'
      ) {
        ext = 'xlsx';
      }
      if (
        item.split('.')[item.split('.').length - 1] == 'docx' ||
        item.split('.')[item.split('.').length - 1] == 'doc'
      ) {
        ext = 'docx';
      }
    }
    return ext;
  }

 
}
