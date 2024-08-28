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
    { icon: 'feather feather-home', route: '/group/property', name: 'Property' },
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

  chartOptionVisitPercentage: any = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total visit for companies',
    },
    subtitle: {
      text: '',
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
    },
    xAxis: {
      type: 'category',
      labels: {
        rotation: -60,
      },
    },
    yAxis: {
      title: {
        text: 'Total visit for companies in 100',
      },
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      series: {
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          format: '{point.y:.1f}%',
        },
      },
    },

    credits: {
      enabled: false,
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: <b>%{point.y}</b> <br/>',
    },

    series: [
      {
        name: 'Data',
        colorByPoint: true,
        data: [],
      },
    ],
  };

  data: any = {};
  chartConstructor = 'chart';
  selectedCompany: any;
  totalDataTicketForCompany: any = {};
  totalDataTicketForLocation: any = {};
  totalDataTicketForItems: any = {};
  total: any = 0;
  it_staffs: any =[];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dic: DicService,
    private http: HttpService
  ) {
    this.route.queryParams.subscribe((params) => {
      this.p.year = params['year'];
      this.p.staff_id = params['staff_id'];
      if (this.p.year == undefined || !this.p.year)
        this.p.year = new Date().getFullYear();
      this.getTotalVisitForCompanies();
    });

    // this.http
    // .call('users', ApiMethod.GET, { skip: 0, limit: 10000, sort: name })
    // .subscribe((ptr: any) => {
    //   this.it_staffs = [];
    //   if (ptr.data)
    //     for (let index = 0; index < ptr.data.length; index++) {
    //       this.it_staffs.push({
    //         label: ptr.data[index].full_name,
    //         value: ptr.data[index]._id,
    //       });
    //     }
    // });

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

    this.getTotalVisitForCompanies();
  }

  getTotalVisitForCompanies() {
    this.DataIsLoading = true;

    this.http
      .call('group/property/work-percentage-report', ApiMethod.GET, this.p)
      .subscribe((ptr: any) => {
        this.DataIsLoading = false;
        this.total = 0;
        this.chartOptionVisitPercentage = {
          chart: {
            type: 'pie',
            renderTo: 'container',
            // options3d: {
            //   enabled: true,
            //   alpha: this.alpha_pie,
            //   beta: this.beta,
            //   depth: this.depth,
            //   viewDistance: 95
            // }
          },
          title: {
            text: null,
          },
          subtitle: {
            text: '',
          },
          accessibility: {
            announceNewData: {
              enabled: true,
            },
          },
          xAxis: {
            type: 'category',
            labels: {
              rotation: -60,
            },
          },
          yAxis: {
            title: {
              text: null,
            },
          },
          legend: {
            enabled: false,
          },
          plotOptions: {
            pie: {
              innerSize: 0,
              depth: 45,
              dataLabels: {
                enabled: true,

                format: '{point.name} - %{point.y:.1f}',
              },
            },

            series: {
              borderWidth: 0,

              dataLabels: {
                style: {
                  fontSize: '14px',
                },
                useHTML: true,
                formatter: function (point) {
                  console.log(point);
                  return (
                    '<div style="font-size:14px"><b>' +
                    point.name +
                    '</b></div><div><b>:' +
                    point.y +
                    ' </b></div>'
                  );
                },
              },
            },
          },
          exporting: {
            sourceWidth: 2500,
            sourceHeight: 600,
          },
          credits: {
            enabled: false,
          },
          tooltip: {
            headerFormat:
              '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat:
              '<span style="color:{point.color}">{point.name}</span>: <b>%{point.y:.2f}</b> <br/>',
          },
          series: [
            //       {
            //     data: this.data.hours
            //   },
            {
              name: this.dic.translate('#'),
              colorByPoint: true,
              data: [],
            },
          ],
        };

        if (ptr.status) {
          this.total = ptr.total;
          this.data = ptr.data;
          this.chartOptionVisitPercentage = {
            chart: {
              type: 'pie',
              renderTo: 'container',
              // options3d: {
              //   enabled: true,
              //   alpha: this.alpha_pie,
              //   beta: this.beta,
              //   depth: this.depth,
              //   viewDistance: 95
              // }
            },
            title: {
              text: null,
            },
            subtitle: {
              text: '',
            },
            accessibility: {
              announceNewData: {
                enabled: true,
              },
            },
            xAxis: {
              type: 'category',
              labels: {
                rotation: -60,
              },
            },
            yAxis: {
              title: {
                text: null,
              },
            },
            legend: {
              enabled: false,
            },
            plotOptions: {
              pie: {
                innerSize: 0,
                depth: 45,
                dataLabels: {
                  enabled: true,

                  format: '{point.name} - %{point.y:.1f}',
                },
              },

              series: {
                borderWidth: 0,

                dataLabels: {
                  style: {
                    fontSize: '14px',
                  },
                  useHTML: true,
                  formatter: function (point) {
                    console.log(point);
                    return (
                      '<div style="font-size:14px"><b>' +
                      point.name +
                      '</b></div><div><b>:' +
                      point.y +
                      ' </b></div>'
                    );
                  },
                },
              },
            },
            exporting: {
              sourceWidth: 2500,
              sourceHeight: 600,
            },
            credits: {
              enabled: false,
            },
            tooltip: {
              headerFormat:
                '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat:
                '<span style="color:{point.color}">{point.name}</span>: <b>%{point.y:.2f}</b> <br/>',
            },
            series: [
              //       {
              //     data: this.data.hours
              //   },
              {
                name: this.dic.translate('#'),
                colorByPoint: true,
                data: this.data,
              },
            ],
          };
        }
      });
  }
}
