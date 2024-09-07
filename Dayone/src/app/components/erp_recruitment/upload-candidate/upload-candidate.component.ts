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
  selector: 'app-upload-candidate',
  templateUrl: './upload-candidate.component.html',
  styleUrls: ['./upload-candidate.component.scss'],
})
export class UploadCandidateComponent implements OnInit {
  @ViewChild('largemodaladd') largemodaladd
  pageTitle: string = 'Upload candidates throw excel file';
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

    this.route.queryParams.subscribe((params) => {
      this.params._id = params['_id'];
      this.getData(false);
    });
   
 
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
          }
        } else {
          this.http.createToast('error', ptr.message);
        }

      });
  }
 
  uploadCandidate() {
    this.http
      .call('recruitment-candidates', ApiMethod.POST, this.params,{data:this.applicationsModel})
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.http.createToast('succcess', ptr.message);
          this.getData(false)
          this.applicationsModel = []
        } else {
          this.http.createToast('error', ptr.message);
        }

      });
  }
 
 
  handleCancel(type: any): void {
    type == 'edit' ? (this.editModal = false) : (this.addModal = false);
    // this.isLoading = false;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
 


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
 
  candidate_headers = [
      "Level",
      "Candidate name",
      "Email",
      "Phone",
      "Interview type",
      "Application date",
      "Screening date",
      "Shortlist date",
      "Phone screen date",
      "Interview date",
      "Second round interview date",
      "Offer date",
      "Hiring date",
      "Joining date",
      "Probationary date",
      "Note",
      "Status",
  ] 

 

  onFileChange(ev: any) {
    this.applicationsModel = []
    this.uploadStatus = false
    var workBook;
    var jsonData;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' , cellDates: true });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        console.log(jsonData,"jsonDAta");
        
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      console.log(dataString['Data'],"stringify data");
      // this.applicationsModel = JSON.parse(dataString)
      // console.log(this.applicationsModel,"parsed json");
      // console.log(Object.keys(this.applicationsModel['data'][0]))
   
      var detail = jsonData['Data'];
       

      // for (let index = 0; index < detail.length; index++) {
      //   if(!detail[index].level)
      //     this.uploadStatus = true
      // }
      // for (let index = 0; index < detail.length; index++) {
      //   detail[index].application_date = new Date(detail[index].application_date)
      // }
      this.applicationsModel = detail;

  
    };
    reader.readAsBinaryString(file);
  }
}
