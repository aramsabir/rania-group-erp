import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
})
export class NewPostComponent implements OnInit {
  model: any = { members: [], progress: 0 };
  model1!: NgbDateStruct;
  grades: any = [];
  members: any = [];
  params: any = { _id: '' };
  sliderOptions: any = {};
  pageTitle: string = 'New';
  actions: any = [];
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
  genderOptions: any = [
    { value: 'Male', label: this.dic.translate('Male'), gender: "male", color: 'primary', },
    { value: 'Female', label: this.dic.translate('Female'), gender: "female", color: 'pink' },
    { value: 'N/A', label: this.dic.translate('N/A'), gender: "male-female", color: 'success', },
  ];
  requestTypeOptions: any = [
    { value: 'Letter', label: this.dic.translate('Letter'), icon: 'fa fa-file', color: 'primary', },
    { value: 'Email', label: this.dic.translate('Email'), icon: 'feather feather-mail', color: 'pink' },
    { value: 'Oral', label: this.dic.translate('Oral'), icon: 'fa fa-assistive-listening-systems', color: 'success', },
  ];
  hiringReasonOptions: any = [
    { value: 'New post', label: this.dic.translate('New post'), type: "plus", color: 'success', },
    { value: 'Alternative', label: this.dic.translate('Alternative'), type: "refresh", color: 'orange' },
  ];

  progress: FormControl<string | null>;
  component: string = 'add';
  userInfo: any;
  resources: any;
  update: boolean = false;
  lang: string;
  companies: any;
  departments: any = [];
  employees: any = [];
  unfilled_reasons: any = [];
  posts: any = [];
  can_see_salary: boolean = false
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private dic: DicService,
    private http: HttpService,
    private authService: AuthService,
    private toasterService: ToastrService
  ) {

    this.lang = this.dic.lang()
    this.model.date_request =
      this.datePipe.transform(new Date(), 'yyyy-MM-dd') + ' 08:00';

  
          if (this.authService.hasPermission('recruitment:update'))
            this.update = true;
          if (this.authService.hasPermission('recruitment:salary'))
            this.can_see_salary = true;
          console.log(this.can_see_salary);
          

    if (this.lang == 'en')
      this.sliderOptions = {
        floor: 0,
        ceil: 100,
        step: 1,
        showSelectionBar: true,
      };
    if (this.lang != 'en')
      this.sliderOptions = {
        floor: 0,
        ceil: 100,
        step: 1,
        rtl: true,
        rightToLeft: 'rtl',
        showSelectionBar: true,
      };
    this.route.queryParams.subscribe((params) => {
      this.params.status = params['status'];
      if (
        ['Completed', 'Pending', 'In progress', 'Canceled'].includes(
          this.params.status
        )
      ) {
        this.model.status = this.params.status;
      }

      this.params._id = params['_id'];
      if (params['_id']) {
        this.component = 'update';
        this.pageTitle = 'Edit';
        this.getOne(params['_id']);
      }
    });

    this.progress = new FormControl('', [
      Validators.max(100),
      Validators.min(0),
    ]);

    this.http
      .call('available_companies', ApiMethod.GET, {
        skip: 0,
        limit: 10000,
        sort: this.lang == 'en' ? 'name' : 'name',
      })
      .subscribe((ptr: any) => {
        this.companies = []

        for (let index = 0; index < ptr.data.length; index++) {
          this.companies.push({ name: this.lang == 'en' ? ptr.data[index].name : ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });


    this.http
      .call('available_basic_datas', ApiMethod.GET, { skip: 0, limit: 10000, sort: 'order', type: "Unfilled reason" })
      .subscribe((ptr: any) => {
        this.unfilled_reasons = []
        this.unfilled_reasons = ptr.data.map(el => {
          return {
            _id: el._id,
            name: this.lang == 'en' ? el.name : el.name
          }
        });
        console.log(this.unfilled_reasons);

      });

    this.http
      .call('available_employees', ApiMethod.GET, {
        skip: 0,
        limit: 10000,
        sort: this.lang == 'en' ? 'name' : 'name',
      })
      .subscribe((ptr: any) => {
        this.employees = []

        for (let index = 0; index < ptr.data.length; index++) {
          this.employees.push({ name: ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });

    this.http
      .call('available_departments', ApiMethod.GET, {
        skip: 0,
        limit: 10000,
        sort: this.lang == 'en' ? 'name' : 'name',
        type: "Department"
      })
      .subscribe((ptr: any) => {
        this.departments = []

        for (let index = 0; index < ptr.data.length; index++) {
          this.departments.push({ name: this.lang == 'en' ? ptr.data[index].name : ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });

    this.http
      .call('available_basic_datas', ApiMethod.GET, {
        skip: 0,
        limit: 10000,
        sort: this.lang == 'en' ? 'name' : 'name',
        type: "Job title"
      })
      .subscribe((ptr: any) => {
        this.posts = []
        for (let index = 0; index < ptr.data.length; index++) {
          this.posts.push({ name: this.lang == 'en' ? ptr.data[index].name : ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });

    this.http
      .call('available_basic_datas', ApiMethod.GET, {
        skip: 0,
        limit: 10000,
        sort: 'order',
        type: 'Grade',
      })
      .subscribe((ptr: any) => {
        this.grades = []
        for (let index = 0; index < ptr.data.length; index++) {
          this.grades.push({ name: this.lang == 'en' ? ptr.data[index].name : ptr.data[index].name, _id: ptr.data[index]._id });
        }
      });


  }

  getOne(id: any) {
    this.http
      .call(
        this.params._id ? 'recruitment-for-edit' : 'recruitment',
        ApiMethod.GET,
        { _id: id }
      )
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.model = ptr.data;
          this.model.date_request = this.datePipe.transform(
            this.model.date_request,
            'yyyy-MM-dd HH:mm'
          );
          this.model.deadline = this.datePipe.transform(
            this.model.deadline,
            'yyyy-MM-dd HH:mm'
          );

        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
        // this.members = ptr.data;
      });
  }

  ngOnInit(): void { }

  save() {
    this.http
      .call(
        'recruitment',
        this.params._id ? ApiMethod.PUT : ApiMethod.POST,
        this.params._id ? { _id: this.params._id } : {},
        this.model
      )
      .subscribe((ptr: any) => {
        if (ptr.status) {
          this.toasterService.success(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );

          this.router.navigate(['/recruitments/process'], {
            queryParams: { _id: ptr._id },
          });
        } else {
          this.toasterService.warning(
            this.dic.translate(ptr.message),
            this.dic.translate('Notification')
          );
        }
        // this.members = ptr.data;
      });
  }
}
