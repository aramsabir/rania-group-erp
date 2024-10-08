import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import { Observable } from 'rxjs';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { AuthService, UserType } from 'src/app/shared/services/firebase/auth.service';
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

  user$: any;


  constructor(
    private authService: AuthService,
    private datePipe: DatePipe,
    private http: HttpService
  ) {
    this.from = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), "yyyy-MM-dd")
    this.to = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    this.now = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm")
    this.hour_before_now = this.datePipe.transform(new Date().setHours(new Date().getHours() - 1), "yyyy-MM-ddTHH:mm")


  }

  ngOnInit() {
    // this.user$ = this.authService.currentUser$
    // this.user$ = this.authService.currentUserSubject.asObservable();
    // console.log(this.user$);

    // console.log(this.authService.hasPermission('employee:read'));
    //  this.authService.getUserByToken().subscribe(user => {console.log(user)});
    // console.log(this.authService.hasPermission('employee:read'));

    // this.http.call('my-roles', ApiMethod.GET, {}).subscribe((res: any) => {
    //   if (res.status == true) {
    //     this.userData = res.data
    //     this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`

    //     var resources: any = []
    //     if (res.resources)
    //       resources = res.resources.split(',')


        if (this.authService.hasPermission('employee:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/employees/main',
            query: {},
            name: 'Employee',
            logo: './assets/applications/employee.png',
          });
        }
        if (this.authService.hasPermission('time-off:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/time-offs/main',
            query: {},
            name: 'Time off',
            logo: './assets/applications/time-off.png',
          });
        }

        if (this.authService.hasPermission('recruitment:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/recruitments/main',
            query: {},
            name: 'Recruitment',
            logo: './assets/applications/recruitment.png',
          });
        }
        if (this.authService.hasPermission('sales:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Sales',
            logo: './assets/applications/sales.png',
          });
        }
        if (this.authService.hasPermission('payroll:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Payroll',
            logo: './assets/applications/payroll.png',
          });
        }
        if (this.authService.hasPermission('approval:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/group',
            query: {},
            name: 'Approval',
            logo: './assets/applications/approval.png',
          });
        }

      
        if (this.authService.hasPermission('purchase:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Purchase',
            logo: './assets/applications/purchase.png',
          });
        }

        if (this.authService.hasPermission('document:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            // router: '/hilal-bricks',
            query: {},
            name: 'Document',
            logo: './assets/applications/document.png',
          });
        }
        if (this.authService.hasPermission('setting:read')) {
          this.arrayLinks.push({
            active: true,
            type: 'href',
            router: '/settings/main',
            query: { skip: 0, limit: 20, sort: '-created_at' },
            name: 'Settings',
            logo: './assets/applications/settings.png',
          });
        }

    //   }
    // })

  }



}
