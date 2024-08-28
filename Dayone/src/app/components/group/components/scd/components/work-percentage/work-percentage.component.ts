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
  selector: 'app-work-percentage',
  templateUrl: './work-percentage.component.html',
  styleUrls: ['./work-percentage.component.scss'],
})
export class WorkPercentageReportComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
    { icon: 'feather feather-home', route: '/group/scd', name: 'Supplychain' },
  ];
  actions: any = [];

  searchStatus: boolean = false;
  chartWorking: any = {
    chart: {
      options3d: {
        enabled: true,
        alpha: 45,
        beta: 0,
      },

      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie',
    },
    title: {
      text: String,
    },

    tooltip: {
      pointFormat: '{series.name}: <b>{point.y:.1f}%</b>',
    },
    accessibility: {
      point: {
        valueSuffix: '%',
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        depth: 35,
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: {point.y:.1f} %',
          connectorColor: 'silver',
        },
      },
    },
    series: [
      {
        name: 'y',
        data: [],
      },
    ],
  };
  p: any = {
    part: '/dashboard/work_percentage',
  };
  chartData: any = [];
  data: any = [];
  showPieChart: boolean = false;
  total: any;
  DataIsLoading: boolean = false;
  Highcharts = Highcharts;

  constructor(
    private sharedService: HttpService,
    private toastService: ToastrService,
    private router: Router,
    private dic: DicService,
    private route: ActivatedRoute
  ) {
    // Radialize the colors
    Highcharts.setOptions({
      colors: Highcharts.map(
        Highcharts.getOptions().colors as [],
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

    this.route.queryParams.subscribe((params) => {
      this.p.year = params['year'];
      this.searchFromTo();
    });
  }

  ngOnInit() {}

  search() {
    this.router.navigate([], { queryParams: { year: this.p.year } });
  }

  searchFromTo() {
    this.DataIsLoading = true;

    this.showPieChart = false;
    this.searchStatus = true;

    if (this.p.year == '') {
      this.toastService.error('Year required');
    } else
      this.sharedService
        .call('group/scd/work-percentage', ApiMethod.GET, this.p)
        .subscribe((ptr: any) => {
          this.DataIsLoading = false;

          if (ptr.status) {
            this.searchStatus = false;

            this.data = ptr.data;
            this.total = ptr.total;
            this.chartData = ptr.chart;

            this.chartWorking = {
              chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie',
                options3d: {
                  enabled: true,
                  alpha: 45,
                  beta: 0,
                },
              },
              title: {
                text: this.dic.translate('Working percentage chart'),
              },
              tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.1f}%</b>',
              },
              accessibility: {
                point: {
                  valueSuffix: '%',
                },
              },
              plotOptions: {
                pie: {
                  // size:700,
                  allowPointSelect: true,
                  cursor: 'pointer',
                  depth: 35,
                  dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y:.1f} %',
                    connectorColor: 'silver',
                  },
                },
              },
              series: [
                {
                  name: 'y',
                  data: this.chartData,
                },
              ],
            };
            if (this.chartData.length > 0) this.showPieChart = true;
          } else {
            this.searchStatus = false;
          }
        });
  }
}
