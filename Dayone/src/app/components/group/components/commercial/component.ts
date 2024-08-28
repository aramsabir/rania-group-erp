import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DlDateTimePickerChange } from 'angular-bootstrap-datetimepicker';
import * as Highcharts from 'highcharts';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-it-main',
  templateUrl: './component.html',
  styleUrls: ['./component.scss']
})
export class MainComponent implements OnInit {


  actions: any = []
  arrayLinks: any = []
  data: any = {
  }
  now: any
  hour_before_now: any
  userData: any;
  userPhoto: string = 'assets/images/users/avatar.png';
 
  user_read: boolean = false;
  log_read: boolean = false;
  from: string | null;
  to: string | null;

  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
  ];
  year: number;

  constructor(
    private datePipe: DatePipe,
    private http: HttpService
  ) {
    this.year  = new Date().getFullYear()
    this.from = this.datePipe.transform(new Date().setMonth(new Date().getMonth() - 1), "yyyy-MM-dd")
    this.to = this.datePipe.transform(new Date(), "yyyy-MM-dd")
    this.now = this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm")
    this.hour_before_now = this.datePipe.transform(new Date().setHours(new Date().getHours() - 1), "yyyy-MM-ddTHH:mm")

  }

  ngOnInit() {
    this.http.call('userinfo', ApiMethod.GET, {}).subscribe((res: any) => {
      if (res.status == true) {
        this.userData = res.data
        this.userPhoto = `${environment.apiUrl}/public/profile_photos/${this.userData.profile_photo}`

        var resources: any = []
        if (res.data.role_id)
          resources = res.data.role_id.resource.split(',')


          this.arrayLinks.push({
            active: true,
            type: 'router',
            router: '/group/commercial/performance',
            query: {year: this.year },
            name: 'Performance',
            logo: './assets/images/main-logo/performance.png',
          });
          // this.arrayLinks.push({
          //   active: true,
          //   type: 'router',
          //   router: '/group/commercial/plan',
          //   query: {},
          //   name: 'Plan',
          //   logo: './assets/images/main-logo/plan.png',
          // });

          this.arrayLinks.push({
            active: true,
            type: 'router',
            router: '/group/commercial/visits',
            query: {year: this.year },
            name: 'Visits',
            logo: './assets/images/main-logo/visit.png',
          });

          this.arrayLinks.push({
            active: true,
            type: 'router',
            router: '/group/commercial/work-percentage',
            query: {year: this.year },
            name: 'Work percentage',
            logo: './assets/images/main-logo/work.png',
          });
          this.arrayLinks.push({
            active: true,
            type: 'router',
            router: '/group/commercial/plan',
            query: {year: this.year },
            name: 'Plan',
            logo: './assets/images/main-logo/plan.webp',
          });
         
        }
    })

  }



}
