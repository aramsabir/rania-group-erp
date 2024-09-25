import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { AuthService } from 'src/app/shared/services/firebase/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  providers: [DatePipe],
})
export class ViewEmployeeComponent implements OnInit {
  model!: NgbDateStruct;
  model1!: NgbDateStruct;
  model2!: NgbDateStruct;

  active = 1;
  currentRate = 3;
  params: any = {};
  pg_header: any = [];
  modelEmployee: any = {};

  endPoint: any = environment.apiIMG + '/images/';
  modelEmployeeData: any = {};
  companies: any = [];
  employees: any = [];
  departments: any = [];
  job_titles: any = [];
  eductaion_degrees: any;
  banks: any;
  modelAddLang: any = {};
  languages: any = [];
  modelAddCertificate: any ={};
  documents: any = 0;
  add_permission: boolean;
  update_permission: boolean;
  delete_permission: boolean;
  time_offs: any;
  constructor(
    config: NgbRatingConfig,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
    private httpService: HttpService,
    private authService: AuthService
  ) {
    this.add_permission = this.authService.hasPermission('employee:add')
    this.update_permission = this.authService.hasPermission('employee:update')
    this.delete_permission = this.authService.hasPermission('employee:delete')

    this.httpService
      .call(`${'available_companies'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.companies = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_employees'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.employees = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_departments'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.departments = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_basic_datas'}`, ApiMethod.GET, {
        type: 'Job title',
        ...this.params,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.job_titles = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_basic_datas'}`, ApiMethod.GET, {
        type: 'Education degree',
        ...this.params,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.eductaion_degrees = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_basic_datas'}`, ApiMethod.GET, {
        type: 'Bank',
        ...this.params,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.banks = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_basic_datas'}`, ApiMethod.GET, {
        type: 'Language',
        ...this.params,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.languages = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    this.httpService
      .call(`${'available_departments'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.departments = res.data;
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );

    // customize default values of ratings used by this component tree
    config.max = 5;
    this.routes.queryParams.subscribe((params: any) => {
      this.params._id = params._id;

      this.pg_header = [
        { link: '/employees', params: {}, value: 'Employees' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.getData();
      this.getSmartButtonsData()
    });
  }

  getSmartButtonsData() {

    this.httpService
    .call(`${'count-employee-documents'}`, ApiMethod.GET, this.params)
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.documents = res.count;
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error);
      }
    );
    
    this.httpService
    .call(`${'count-employee-time-offs'}`, ApiMethod.GET, this.params)
    .subscribe(
      (res: any) => {
        if (res.status) {
          this.time_offs = res.count;
        }
      },
      (error: any) => {
        this.httpService.createToast('error', error);
      }
    );
  }

  ngOnInit(): void {}

  getData() {
    this.httpService
      .call(`${'employee-one'}`, ApiMethod.GET, this.params)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.httpService.createToast('success', res.message);
            this.modelEmployee = res.data;
            this.modelEmployeeData = {
              full_name: res.data.full_name,
              job_title: res.data.job_title_id.name,
              main_company: res.data.main_company_id.name,
              department: res.data.department_id.name,
            };
            this.modelEmployee.job_title_id = res.data.job_title_id._id;
            this.modelEmployee.main_company_id = res.data.main_company_id._id;
            this.modelEmployee.department_id = res.data.department_id._id;
            this.modelEmployee.date_of_birth = this.datePipe.transform(
              this.modelEmployee.date_of_birth,
              'yyyy-MM-dd'
            );
            this.modelEmployee.employement_date = this.datePipe.transform(
              this.modelEmployee.employement_date,
              'yyyy-MM-dd'
            );
            this.modelEmployee.date_of_hire = this.datePipe.transform(
              this.modelEmployee.date_of_hire,
              'yyyy-MM-dd'
            );
            this.modelEmployee.contract_date = this.datePipe.transform(
              this.modelEmployee.contract_date,
              'yyyy-MM-dd'
            );
            this.modelEmployee.termination_date = this.datePipe.transform(
              this.modelEmployee.termination_date,
              'yyyy-MM-dd'
            );
            this.modelEmployee.punishment_date = this.datePipe.transform(
              this.modelEmployee.punishment_date,
              'yyyy-MM-dd'
            );
            this.modelEmployee.probation_period_end_date =
              this.datePipe.transform(
                this.modelEmployee.probation_period_end_date,
                'yyyy-MM-dd'
              );
            this.modelEmployee.retirement_date = this.datePipe.transform(
              this.modelEmployee.retirement_date,
              'yyyy-MM-dd'
            );
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  updateEmp() {
    this.httpService
      .call(`${'employee'}`, ApiMethod.PUT, this.params, this.modelEmployee)
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  addLang() {
    this.httpService
      .call(`${'add-lang-employee'}`, ApiMethod.POST, this.params, {
        _id: this.params._id,
        ...this.modelAddLang,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  removeLang(doc_id: any) {

    if(confirm("Are you sure to delete this item")) {
      this.httpService
      .call(
        `${'pull-lang-employee'}`,
        ApiMethod.PUT,
        { _id: this.params._id, doc_id: doc_id },
        { _id: this.params._id, doc_id: doc_id }
      )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    }
  }
  AddCertificate() {
    this.httpService
      .call(`${'add-certificate-employee'}`, ApiMethod.POST, this.params, {
        _id: this.params._id,
        ...this.modelAddCertificate,
      })
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
  }
  removeCertificate(doc_id: any) {

    if(confirm("Are you sure to delete this item")) {
      this.httpService
      .call(
        `${'pull-certificate-employee'}`,
        ApiMethod.PUT,
        { _id: this.params._id, doc_id: doc_id },
        { _id: this.params._id, doc_id: doc_id }
      )
      .subscribe(
        (res: any) => {
          if (res.status) {
            this.getData();
          } else {
            this.httpService.createToast('error', res.message);
          }
        },
        (error: any) => {
          this.httpService.createToast('error', error);
        }
      );
    }
  }

  getCicleColorOuter(percentage: number) {
    if (percentage < 25) {
      return '#ff0000';
    } else if (percentage < 50) {
      return '#fe7f00';
    } else if (percentage < 75) {
      return '#3366ff';
    } else {
      return '#0dcd94';
    }
  }
  getCicleColorInner(percentage: number) {
    if (percentage < 25) {
      return '#ffe9cb';
    } else if (percentage < 50) {
      return '#f7cba0';
    } else if (percentage < 75) {
      return '#93abf3';
    } else {
      return '#87e9cb';
    }
  }


  getColor(i:any){
    var items = ['red', 'green', 'yellow', 'info','warning','danger','cyan']
      i = i%5
    
    return items[i]
  }
}
