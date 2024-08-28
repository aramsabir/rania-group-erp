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
  selector: 'app-hcnt-main',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class HCNTMainComponent implements OnInit {
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

  constructor(
    private metaService: SeoService,
    private routes: ActivatedRoute,
    private datePipe: DatePipe,
    private http: HttpService
  ) {
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

        if (resources.includes('hcnt:sales-per-month')) {
          this.arrayLinks.push({
            active: true,
            router: '/hcnt/sales-per-month',
            query: { from_date: this.from_date, to_date: this.to_date },
            name: 'Sales per month',
            logo: './assets/images/main-logo/calendar.png',
          });
        }
        if (resources.includes('hcnt:sales-per-customer')) {
          this.arrayLinks.push({
            active: true,
            router: '/hcnt/sales-per-customer',
            query: { from_date: this.from_month, to_date: this.to_date,customer_type:'dealer' },
            name: 'Sales per customer',
            logo: './assets/images/main-logo/customer-chart.jpeg',
          });
        }
        
        if (resources.includes('hcnt:sales-per-product-type')) {
          this.arrayLinks.push({
            active: true,
            router: '/hcnt/sales-per-product-type',
            query: { from_date: this.from_date, to_date: this.to_date },
            name: 'Sales per product type',
            logo: './assets/images/main-logo/chart.jpeg',
          });
        }
       
        if (resources.includes('hcnt:sales-per-date')) {
          this.arrayLinks.push({
            active: true,
            router: '/hcnt/sales-per-date',
            query: { from_date: this.from_date, to_date: this.to_date },
            name: 'Sales per date',
            logo: './assets/images/main-logo/inventory.png',
          });
        }
      }
    });
  }
}
