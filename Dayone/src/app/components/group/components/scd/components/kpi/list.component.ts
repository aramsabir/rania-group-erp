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
import { ChartOptions, ChartType } from 'chart.js';
HighchartsMore(Highcharts);

import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-visits',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class KPIComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
    { icon: 'feather feather-home', route: '/group/scd', name: 'Supplychain' },
    // {
    //   icon: 'fe fe-codepen',
    //   route: '/visits',
    //   queryParams: { skip: 0, limit: 20, sort: 'name', cond: 'my_visits' },
    //   name: 'Visits',
    // },
  ];
  actions: any = [];
  DataIsLoading: boolean = false;
  Highcharts = Highcharts;
  alpha_pie: number = 40;
  alpha: number = 0;
  beta: number = 0;
  depth: number = 10;

  optionsSelect: any = [];
  dataLocation: any = [];

  yearsOption: any = [
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' },
    { label: '2026', value: '2026' },
    { label: '2027', value: '2027' },
    { label: '2028', value: '2028' },
    { label: '2029', value: '2029' },
    { label: '2030', value: '2030' },
  ];

  public p: any = {
    part: '/reports/working_it_staff_per_year',
    leave: false,
  };

  kpi: any = {
    purchase_external_unit: {
      kpis: [],
      collected_mark: 0,
      total_marks: 0,
    },
    purchase_internal_unit: {
      kpis: [],
      collected_mark: 0,
      total_marks: 0,
    },
    visit_and_check: {
      kpis: [],
      collected_mark: 0,
      total_marks: 0,
    },
    warehouse_control: {
      kpis: [],
      collected_mark: 0,
      total_marks: 0,
    },
  };
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private dic: DicService,
    private router: Router,
    private toastservice: ToastrService,
    private modalService: NgbModal,
    private http: HttpService
  ) {
    this.lang = this.dic.lang();
    this.route.queryParams.subscribe((params) => {
      this.p.year = params['year'];
      if (params['year']) this.getData();
    });
  }

  search(event: any) {
    this.router.navigate([], { queryParams: { year: event } });
  }

  getData() {
    this.DataIsLoading = true;
    if (this.p.year && !this.p.staff_id) {
      this.http
        .call('group/scd/yearly-kpi', ApiMethod.GET, {
          year: this.p.year,
        })
        .subscribe((ptr: any) => {
          this.DataIsLoading = false;
          if (ptr.status) {
            this.kpi = ptr.kpi;

            console.log(this.kpi);
          }
        });
    }
  }

  ngOnInit(): void {}
}
