import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';

import * as Highcharts from 'highcharts';
import 'highcharts/modules/exporting';
import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

import HC_exportData from 'highcharts/modules/export-data';
HC_exportData(Highcharts);

import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(Highcharts);

@Component({
  selector: 'app-plan-report',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class PlanReportComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
    { icon: 'feather feather-home', route: '/group/pmo', name: 'PMO' },
    // {
    //   icon: 'fe fe-codepen',
    //   route: '/visits',
    //   queryParams: { skip: 0, limit: 20, sort: 'name', cond: 'my_visits' },
    //   name: 'Visits',
    // },
  ];
  actions: any = [
    // {
    //   class: 'btn btn-primary',
    //   icon: 'feather feather-plus',
    //   ngbTooltip: this.dic.translate('New Ticket'),
    //   type: 'info',
    //   url: '/administrator_tickets/new',
    // },
  ];
  userData: any = {};
  DataIsLoading: boolean = false;
  Highcharts = Highcharts;
  alpha_pie: number = 40;
  alpha: number = 0;
  beta: number = 0;
  depth: number = 10;
  p: any = {
    unit: '',
  };
  // Highcharts: typeof Highcharts = Highcharts;

  data: any = [];
  chartConstructor = 'chart';
  selectedCompany: any;
  totalDataTicketForCompany: any = {};
  totalDataTicketForLocation: any = {};
  totalDataTicketForItems: any = {};
  total: any = 0;
  it_staffs: any = [];
  lang: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dic: DicService,
    private http: HttpService
  ) {
    this.lang = this.dic.lang()
    this.route.queryParams.subscribe((params) => {
      this.p.year = params['year'];
      this.p.month = params['month'];
      this.p.type = params['type'];
      if (this.p.year == undefined || !this.p.year)
        this.p.year = new Date().getFullYear();
      this.getPlanReport();
    });

    this.http
      .call('users', ApiMethod.GET, { skip: 0, limit: 10000, sort: name })
      .subscribe((ptr: any) => {
        this.it_staffs = [];
        if (ptr.data)
          for (let index = 0; index < ptr.data.length; index++) {
            this.it_staffs.push({
              label: ptr.data[index].full_name,
              value: ptr.data[index]._id,
            });
          }
      });

    Highcharts.setOptions({
      colors: Highcharts.map(
        [
          '#7cb5ec',
          '#8085e9',
          '#f15c80',
          '#e4d354',
          '#2b908f',
          '#434348',
          '#90ed7d',
          '#f7a35c',
          '#f45b5b',
          '#f4568b',
          '#fe345b',
          '#91e8e1',
        ],
        function (color: any) {
          return {
            radialGradient: {
              cx: 0.5,
              cy: 0.3,
              r: 0.7,
            },
            stops: [
              [0, color],
              [1, Highcharts.color(color).brighten(-0.3).get('rgb')], // darken
            ],
          };
        }
      ),
    });
  }

  clearFilter() {
    this.p = {
      year: '',
      month: '',
      type: '',
    };
    this.router.navigate([this.p.part], {
      relativeTo: this.route,
      queryParams: this.p,
    });
  }
  ngOnInit() {
    if (this.p.year == undefined || !this.p.year) {
      this.router.navigate([], {
        queryParams: { year: new Date().getFullYear() },
      });
    }
  }
  search() {
    this.router.navigate([], {
      queryParams: this.p,
    });
  }
  searchUnit(event: any) {
    this.router.navigate([], {
      queryParams: { year: this.p.year, unit: event },
    });
  }

  onRangeValueChange(event: any, name: any) {
    const value = event.value;
    if (name == 'alpha') this.alpha = value;
    if (name == 'beta') this.beta = value;
    if (name == 'depth') this.depth = value;

    this.getPlanReport();
  }

  getPlanReport() {
    this.DataIsLoading = true;

    this.http
      .call('group/pmo/plan-report', ApiMethod.GET, this.p)
      .subscribe((ptr: any) => {
        this.DataIsLoading = false;
        this.total = 0;

        if (ptr.status) {
          this.total = ptr.total;
          this.data = ptr.data;
        }
      });
  }

  sumYearly(i: any) {
    var total = 0;
    this.data[i].data.forEach((item: any) => {
      total += item.total;
    });

    return total / this.data[i].data.length + '/100';
  }

  sum(i: any) {
    var result = 0;
    var total = 0;
    this.data[i].data.forEach((item: any) => {
      result += item.result;
      total += item.percentage;
    });

    return result + '/' + total;
  }

  sumAll() {
      var total = 0;
      var counter = 0;
      this.data.forEach((item: any) => {
        item.data.forEach((item2: any) => {
          total += item2.total;
          counter++
        });
      });
      var result = total / counter
      
      return {
        data: (parseFloat(result +'').toFixed(1)) + '/100',
        color: total / counter >= 50 ? 'success' : 'orange',
      };
   
  }
}
