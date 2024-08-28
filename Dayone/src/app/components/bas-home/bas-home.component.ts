import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-bas-home',
  templateUrl: './bas-home.component.html',
  styleUrls: ['./bas-home.component.scss']
})
export class BasHomeComponent implements OnInit {


  actions: any = []
  arrayLinks: any = []
  data: any = {
  }
  now: any
  hour_before_now: any
  userData: any;
  userPhoto: string = 'assets/images/users/avatar.png';
  accident_read: boolean = false;
  visit_read: boolean = false;
  warning_read: boolean = false;
  activity_read: boolean = false;
  employee_read: boolean = false;
  company_read: boolean = false;
  Contractors_add: boolean = false;
  VisitReasons_add: boolean = false;
  AccidentReasons_add: boolean = false;
  WarningReasons_add: boolean = false;
  WarningTypes_add: boolean = false;
  ActivitySubjects_read: boolean = false;
  user_read: boolean = false;
  log_read: boolean = false;
  from: string | null;
  to: string | null;


  constructor(
    private datePipe: DatePipe,
    private http: HttpService
  ) {
    this.from = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), "yyyy-MM-dd")
    this.to = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    this.now = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm")
    this.hour_before_now = this.datePipe.transform(new Date().setHours(new Date().getHours() - 1), "yyyy-MM-ddTHH:mm")

  }

  ngOnInit() {
    this.http.call('my-roles', ApiMethod.GET, {}).subscribe((res: any) => {
      if (res.status == true) {
        this.userData = res.data
        this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`

        var resources: any = []
        if (res.resources)
          resources = res.resources.split(',')
        console.log(resources);


        if (resources.includes('employee:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Employee',
            logo: './assets/applications/employee.png',
          });
        }
        if (resources.includes('sales:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Sales',
            logo: './assets/applications/sales.png',
          });
        }
        if (resources.includes('payroll:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Payroll',
            logo: './assets/applications/payroll.png',
          });
        }
        if (resources.includes('approval:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Approval',
            logo: './assets/applications/approval.png',
          });
        }

        if (resources.includes('time-off:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Time off',
            logo: './assets/applications/time-off.png',
          });
        }

        if (resources.includes('purchase:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Purchase',
            logo: './assets/applications/purchase.png',
          });
        }
        if (resources.includes('recruitment:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Recruitment',
            logo: './assets/applications/recruitment.png',
          });
        }
        if (resources.includes('setting:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Settings',
            logo: './assets/applications/settings.png',
          });
        }

        if (resources.includes('abf:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/aso-bricks/main',
            query: {},
            name: 'Aso Brick Factory',
            logo: './assets/images/companies/abf.svg',
          });
        }

        if (resources.includes('hcnt:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/hcnt',
            query: {},
            name: 'Halabja Concrete',
            logo: './assets/images/companies/hc.svg',
          });
        }

        if (resources.includes('fm:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/family-mall',
            query: {},
            name: 'Family mall',
            logo: './assets/images/companies/fm.svg',
          });
        }

        if (resources.includes('aran:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-aran',
            query: {},
            name: 'Aran Asphalt',
            logo: './assets/images/companies/aran.svg',
          });
        }

        if (resources.includes('hps:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-hps',
            query: {},
            name: 'Halabja Petrol Station',
            logo: './assets/images/companies/hps.svg',
          });
        }

        if (resources.includes('hcs:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-hcs',
            query: {},
            name: 'Halabja Cleaning Service',
            logo: './assets/images/companies/hcs.svg',
          });
        }

        if (resources.includes('hts:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-hts',
            query: {},
            name: 'Halabja Telecom Services',
            logo: './assets/images/companies/hts.svg',
          });
        }

        if (resources.includes('ibf:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-ibf',
            query: {},
            name: 'Ishtar Brick Factory',
            logo: './assets/images/companies/ibf.svg',
          });
        }

        if (resources.includes('ht:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-ht',
            query: {},
            name: 'Halabja Trading',
            logo: './assets/images/companies/ht.svg',
          });
        }

        if (resources.includes('rasan-farm:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-rasan-farm',
            query: {},
            name: 'Rasan Farm',
            logo: './assets/images/companies/rasan-farm.svg',
          });
        }

        if (resources.includes('rasan-olive:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-rasan-olive',
            query: {},
            name: 'Rasan Olive Oil',
            logo: './assets/images/companies/rasan-olive.svg',
          });
        }

        if (resources.includes('h-contracting:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-h-contracting',
            query: {},
            name: 'Halabja Contracting',
            logo: './assets/images/companies/h-contracting.svg',
          });
        }

        if (resources.includes('gc:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/bas-gc',
            query: {},
            name: 'Garden City',
            logo: './assets/images/companies/gc.svg',
          });
        }
        if (resources.includes('user:read')) {
          this.arrayLinks.push({
            type: 'router',
            active: true,
            router: '/bas-settings/users?skip=0&limit=50&sort=full_name',
            query: {},
            name: 'Users',
            logo: './assets/images/user_settings.png',
          });
        }
        if (resources.includes('role:read')) {
          this.arrayLinks.push({
            type: 'router',
            active: true,
            router: '/bas-settings/roles?skip=0&limit=50&sort=name',
            query: {},
            name: 'Role',
            logo: './assets/images/key.png',
          });
        }
        if (resources.includes('log:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'router',
            router: '/bas-settings/logs?skip=0&limit=50&sort=-created_at',
            query: {},
            name: 'Log',
            logo: './assets/images/logging.png',
          });
        }
      }
    })

  }



}
