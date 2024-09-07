import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

interface PeriodicElement {
  No: number;
  Task: string;
  badge: string;
  Department: string;
  img: string;
  AssignTo: string;
  Priority: string;
  PriorityStatus: string;
  StartDate: string;
  Deadline: string;
  progress: number;
  progressStatus: string;
  worksStatus: string;
  worksText: string;
}

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
})
export class PostListComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;
  model3!: NgbDateStruct;
  displayedColumns: string[] = [
    'No.',
    'Status',
    'Company',
    'Department',
    'Post',
    'Date request',
    'Deadline',
    'Gender',
    'Hiring reason',
    'Applications',
    'Actions',
  ];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  pageTitle: string = 'All';
  actions: any = [
    {
      class: 'btn btn-primary',
      icon: 'feather feather-plus',
      text: this.dic.translate('New Recruitment'),
      type: 'info',
      url: '/recruitments/new',
      part:'button'
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
  departments: any = [];
  posts: any = [];
  params: any = {
    skip: 0,
    limit: 0,
    sort: '-created_at',
    departments: [],
    members: [],
    approved: '',
    from: '',
    to: '',
    to_dates: {},
    from_dates: {},
    priority: '',
  };
  priorityOptions: any = [
    { value: 'High', label: this.dic.translate('High'), color: 'danger' },
    { value: 'Medium', label: this.dic.translate('Medium'), color: 'secondary' },
    { value: 'Low', label: this.dic.translate('Low'), color: 'yellow' },
  ];
  itemForDelete: any = {};
  stract: any = {
    members: [],
  };
  page: number = 0;
  length: number = 0;
  statusOptions: any = [
    {
      value: 'Process',
      label: this.dic.translate('Process'),
      color: 'warning',
    },
    {
      value: 'Completed',
      label: this.dic.translate('Completed'),
      color: 'success',
    },
    {
      value: 'Suspended',
      label: this.dic.translate('Suspended'),
      color: 'danger',
    },
    {
      value: 'Canceled',
      label: this.dic.translate('Canceled'),
      color: 'danger',
    },
  ];
  apiEndPoint: string;
  lang: string;
  grades: any = [];

  constructor(
    private route: ActivatedRoute,
    private dic: DicService,
    private datePipe: DatePipe,
    private router: Router,
    private modalService: NgbModal,
    private http: HttpService
  ) {

    this.lang = this.dic.lang()
    // Assign the data to the data source for the table to render

  
    this.http
      .call('available_departments', ApiMethod.GET, {
        skip: 0,
        lihr: 10000,
        sort: this.lang == 'en' ? 'en_name' : '',
        type: "Department"
      })
      .subscribe((ptr: any) => {
        this.departments = []

        for (let index = 0; index < ptr.data.length; index++) {
          this.departments.push({ name: this.lang == 'en' ? ptr.data[index].en_name : ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });

    this.http
      .call('available_basic_datas', ApiMethod.GET, {
        skip: 0,
        lihr: 10000,
        sort: this.lang == 'en' ? 'name' : 'name',
        type: "Job title"
      })
      .subscribe((ptr: any) => {
        this.posts = []
        for (let index = 0; index < ptr.data.length; index++) {
          this.posts.push({ name:  ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });

 

    this.apiEndPoint = environment.apiIMG + '/profile_photos/';


    this.route.queryParams.subscribe((params) => {
      this.params.sort = params['sort'] ? params['sort'] : '-created_at';
      this.params.skip = +params['skip'] ?  params['skip']: 0 ;
      this.params.limit = params['limit'] ? params['limit']: 30 ;
      this.params.search = params['search'];
      this.page = this.params.skip / this.params.limit + 1;

      this.params.from = params['from'] ? params['from'] : '';
      this.params.to = params['to'] ? params['to'] : '';
      this.params.status = params['status'] ? params['status'] : null;
      this.params.priority = params['priority'] ? params['priority'] : null;
      this.params.approved = params['approved'] ? params['approved'] : '';
      this.params.members = params['members'] ? params['members'] : '';
      this.getData();
    });
  }

  ngOnInit(): void { }
  datePlusDays(date: any, days: any) {
    return new Date(new Date(date).setDate(new Date(date).getDate() + days))
  }
  deadlineText(date: any) {
    return new Date(date) > new Date() ? 'success' : 'danger'
  }

  undoApproval(_id: any) {
    this.http
      .call('undo-approve-recruitment', ApiMethod.POST, { _id: _id }, {})
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.http.createToast('success', ptr.message);

          this.getData();
        } else {
          this.http.createToast('error', ptr.message);
        }
      });
  }

  approve(_id: any) {
    this.http
      .call('approve-recruitment', ApiMethod.POST, { _id: _id }, {})
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.http.createToast('success', ptr.message);

          this.getData();
        } else {
          this.http.createToast('error', ptr.message);
        }
      });
  }

  getData() {
    this.http
      .call('recruitments', ApiMethod.POST, this.params, this.params)
      .subscribe((ptr: any) => {
        this.dataSource = ptr.data;
        this.length = ptr.count;
      });
  }
  profileImage(source: any) {
    return environment.apiIMG + '/profile_photos/' + source;
  }

  priorityColor(priority: string) {
    if (priority == 'High') return 'danger';
    if (priority == 'Medium') return 'secondary';
    if (priority == 'Low') return 'warning';
    return 'cyan'

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
  statusColor(status: string) {
    if (status == 'Completed') return 'success';
    if (status == 'Canceled') return 'danger';

    if (status == 'In progress') return 'orange';
    return 'warning';
  }

  WarningOpen(warningmodal: any, item: any) {
    this.modalService.open(warningmodal, { centered: true });
    this.itemForDelete = item;
  }
  deleteItem() {
    this.http
      .call(`recruitment`, ApiMethod.DELETE, {
        _id: this.itemForDelete._id,
      })
      .subscribe((res: any) => {
        if (res.status) {
          this.http.createToast('success', res.message);

          this.getData();
        } else {
          this.http.createToast('error', res.message);
        }
      });
  }
  edit(editContent: any) {
    this.modalService.open(editContent, {
      backdrop: 'static',
      windowClass: 'modalCusSty',
    });
  }

  search() {
    this.router.navigate([], { queryParams: this.params });
  }
}
