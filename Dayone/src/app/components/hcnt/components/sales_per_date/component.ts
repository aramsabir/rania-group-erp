import { Component, OnInit } from '@angular/core';
import { ApiMethod } from 'src/app/@core/service/apis';
import { DicService } from 'src/app/@core/service/dic/dic.service';
import { HttpService } from 'src/app/@core/service/http/http.service';
import { environment } from 'src/environments/environment';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import cylinder from 'highcharts/modules/cylinder';
import 'highcharts/modules/exporting';

import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

import HC_exporting from 'highcharts/modules/exporting';
HC_exporting(Highcharts);

import HC_exportData from 'highcharts/modules/export-data';
import { GOVS } from 'src/app/@core/service/constants/cities';
import { ActivatedRoute, Router } from '@angular/router';
HC_exportData(Highcharts);

highcharts3d(Highcharts);
cylinder(Highcharts);

@Component({
  selector: 'app-hcnt-sales-per-date',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class SalesPerDateComponent implements OnInit {
  titlePage: string = 'Sales per date';
  actions: any = [];
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'fe fe-activity', route: '/hcnt/main', name: 'Halabja concrete' },
  ];

  params: any = {};
  apiUrl: string;
  lang: string;
  model: any = {};

  chartOptions: any = {};

  themeStyle: any = 'light';
  data: any = [];
  total: any = {};

  constructor(private dic: DicService, private httpService: HttpService) {
    this.model.from_date = new Date(
      new Date().setDate(new Date().getDate() - 1)
    )
      .toISOString()
      .substring(0, 10);
    this.model.to_date = new Date(new Date().setDate(new Date().getDate() - 1))
      .toISOString()
      .substring(0, 10);

    this.lang = this.dic.lang();
    this.apiUrl = environment.apiUrl;
    this.themeStyle = localStorage.getItem('theme');

    this.getData();
  }

  ngOnInit(): void {}

  getData() {
    this.model.from_date = new Date(this.model.from_date)
      .toISOString()
      .split('T')[0];
    this.model.to_date = new Date(this.model.to_date)
      .toISOString()
      .split('T')[0];

    this.total = {};
    this.data = [];

    this.httpService
      .call('hcnt/sales_per_date', ApiMethod.GET, this.model)
      .subscribe((res: any) => {
        if (res.status) {
          this.data = res.list;
          this.total = res.total;
        } else {
          this.data = [];
        }
      });
  }
}
