import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbDateStruct, NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ApiMethod } from 'src/app/@core/service/apis';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss']
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
  modelEmployeeData: any= {}
  companies: any = [];
  employees: any = [];
  departments: any = [];
  job_titles: any = [];

  constructor(
    config: NgbRatingConfig,
    private routes: ActivatedRoute,
    private httpService: HttpService,

  ) {

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
    .call(`${'available_job_titles'}`, ApiMethod.GET, this.params)
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
      this.params._id = params._id 

      this.pg_header = [
        { link: '/employees', params: {}, value: 'Employees' },
        // {link:'/home/settings/sources',params:params,value:"sources"},
      ];

      this.getData();
    });
  }
  ngOnInit(): void {
  }

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
            }
            this.modelEmployee.job_title_id = res.data.job_title_id._id
            this.modelEmployee.main_company_id = res.data.main_company_id._id
            this.modelEmployee.department_id = res.data.department_id._id
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
