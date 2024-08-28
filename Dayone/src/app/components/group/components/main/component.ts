import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { SeoService } from 'src/app/@core/service/seo';
import { environment } from 'src/environments/environment';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group-main',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class GroupMainComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
  ];
  titlePage: any = 'View';
  params: any = {};
  actions: any = [];
  arrayLinks: any = [];
  from_date: string | null;
  to_date: string | null;
  from_month: string | null;
  year: number;

  constructor(
    private metaService: SeoService,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
    private http: HttpService
  ) {
    this.year = new Date().getFullYear()
    this.from_month = this.datePipe.transform(
      new Date().setMonth(new Date().getMonth() - 1),
      'yyyy-MM-dd'
    );
    this.from_date = this.datePipe.transform(
      new Date().setMonth(new Date().getMonth() - 12),
      'yyyy-MM-dd'
    );
    this.to_date = this.datePipe.transform(new Date(), 'yyyy-MM-dd');

    this.metaService.setTitle(environment.app_title, this.titlePage);
  }

  ngOnInit() {
    this.http.call('userinfo', ApiMethod.GET, {}).subscribe((res: any) => {
      if (res.status == true) {
        var resources: any = [];
        if (res.data.role_id) resources = res.data.role_id.resource.split(',');

        if (resources.includes('group:plan')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/plan',
            query: {year: this.year },
            name: 'Plan',
            logo: './assets/images/main-logo/plan.webp',
          });
        }
        if (resources.includes('group:it')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/it',
            query: { from_date: this.from_date, to_date: this.to_date },
            name: 'Information technologies',
            logo: './assets/group-departments/it.png',
          });
        }
        if (resources.includes('group:hr')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/hr',
            query: {},
            name: 'Human resource',
            logo: './assets/group-departments/hr.png',
          });
        }
        if (resources.includes('group:supplychain')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/scd',
            query: {},
            name: 'Supplychain',
            logo: './assets/group-departments/spc.png',
          });
        }
              if (resources.includes('group:legal')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/legal',
            query: {},
            name: 'Legal',
            logo: './assets/group-departments/legal.png',
          });
        }
        
        if (resources.includes('group:pmo')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/pmo',
            query: {},
            name: 'Project Management Office',
            logo: './assets/group-departments/pmo.png',
          });
        }
        if (resources.includes('group:accounting-and-control')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/accounting_and_control',
            query: {},
            name: 'Accounting and control',
            logo: './assets/group-departments/AAC.png',
          });
        }
        if (resources.includes('group:finance')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/finance',
            query: {},
            name: 'Finance',
            logo: './assets/group-departments/finance.png',
          });
        }
        if (resources.includes('group:administration')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/administration',
            query: {},
            name: 'Administration',
            logo: './assets/group-departments/administration.png',
          });
        }
    
        if (resources.includes('group:machines')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/machines',
            query: {},
            name: 'Machines',
            logo: './assets/group-departments/machines.png',
          });
        }
        if (resources.includes('group:reporting')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/reporting',
            query: {},
            name: 'Reporting & analysis',
            logo: './assets/group-departments/reporting_dep.png',
          });
        }
        if (resources.includes('group:landscape')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/landscape',
            query: {},
            name: 'Landscape',
            logo: './assets/group-departments/pcm.png',
          });
        }
   
        if (resources.includes('group:property')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/property',
            query: {},
            name: 'Properties',
            logo: './assets/group-departments/properties.png',
          });
        }
        if (resources.includes('group:commercial')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/commercial',
            query: {},
            name: 'Commercial',
            logo: './assets/group-departments/sales_marketing.jpeg',
          });
        }
        if (resources.includes('group:safety')) {
          this.arrayLinks.push({
            active: true,
            router: '/group/safety',
            query: {},
            name: 'Safety',
            logo: './assets/group-departments/safety.png',
          });
        }
      
      }
    });
  }
}
