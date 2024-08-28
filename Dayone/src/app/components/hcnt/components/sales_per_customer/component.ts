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

import HC_exporting from "highcharts/modules/exporting";
HC_exporting(Highcharts);

import HC_exportData from 'highcharts/modules/export-data';
import { GOVS } from 'src/app/@core/service/constants/cities';
import { ActivatedRoute, Router } from '@angular/router';
HC_exportData(Highcharts);

highcharts3d(Highcharts);
cylinder(Highcharts);



@Component({
  selector: 'app-hcnt-sales-per-customer',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class SalesPerCustomerComponent implements OnInit {
 

  titlePage: string = "Sales per customer";
  actions:any =[]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'fe fe-activity', route: '/hcnt/main', name: 'Halabja concrete' },
  ];

  params: any = {};
  apiUrl: string;
  lang: string;
  model: any = {
    order_option:"project"
  };
  // govs: any = GOVS;
  orderOption: any = [
    { value: 'cash', caption: 'Cash' },
    { value: 'project', caption: 'Project' },
  ];
  darkChartStyle: any = {
    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
    stops: [
      [0, '#2a2a2b'],
      [1, '#3e3e40'],
    ],
  };

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: any = {};
  chartOptions2: any = {};

  themeStyle: any = 'light';
  data: any = [];
  total: any = {};

  constructor(
    private dic: DicService,
    private httpService: HttpService
  ) {
    this.model.from_date = new Date().toISOString().substring(0, 7) 
    this.model.to_date =
      new Date(new Date().setMonth(new Date().getMonth() + 1))
        .toISOString()
        .substring(0, 7);
    this.lang = this.dic.lang();
    this.apiUrl = environment.apiUrl;
    this.themeStyle = localStorage.getItem('theme');

    this.chartOptions = {
      chart: {
        backgroundColor:
          this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
        type: 'cylinder',
        renderTo: 'container',
      },

      xAxis: {
        categories: ['Not available'],
      },
      title: {
        text: null,
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: '',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
        series: {
          colorByPoint: true,
        },
      },
      credits: { enabled: false },
      exporting: {
        sourceWidth: 2500,
        sourceHeight: 600,
        accessibility: {
          enabled: true,
        },
        allowHTML: false,
        buttons: {
          contextButton: {
            enabled: true,
          },
        },
        csv: {
          useLocalDecimalPoint: true,
          dateFormat: '%Y-%m-%d %H:%M:%S',
          itemDelimiter: ',',
          lineDelimiter: '\n',
          columnHeaderFormatter: null,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -80,
        y: 80,
        floating: true,
        borderWidth: 1,
        shadow: true,
      },

      series: [
        {
          type: 'cylinder',
          colorByPoint: true,
          data: [0],
          name: 'Concrete per type',
          showInLegend: false,
        },
      ],
    };
    this.chartOptions2 = {
      chart: {
        backgroundColor:
          this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
        type: 'cylinder',
        renderTo: 'container',
      },

      xAxis: {
        categories: ['Not available'],
      },
      title: {
        text: null,
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: '',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
        series: {
          colorByPoint: true,
        },
      },
      credits: { enabled: false },
      exporting: {
        sourceWidth: 2500,
        sourceHeight: 600,
        accessibility: {
          enabled: true,
        },
        allowHTML: false,
        buttons: {
          contextButton: {
            enabled: true,
          },
        },
        csv: {
          useLocalDecimalPoint: true,
          dateFormat: '%Y-%m-%d %H:%M:%S',
          itemDelimiter: ',',
          lineDelimiter: '\n',
          columnHeaderFormatter: null,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -80,
        y: 80,
        floating: true,
        borderWidth: 1,
        shadow: true,
      },

      series: [
        {
          type: 'cylinder',
          colorByPoint: true,
          data: [0],
          name: 'Concrete per type',
          showInLegend: false,
        },
      ],
    };

    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ',',
      },
      colors: Highcharts.map(
        [
          '#7cb5ec',
          '#434348',
          '#90ed7d',
          '#f7a35c',
          '#8085e9',
          '#f15c80',
          '#e4d354',
          '#2b908f',
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
    this.chartOptions = {
      chart: {
        backgroundColor:
          this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
        type: 'cylinder',
        renderTo: 'container',
      },

      xAxis: {
        categories: ['Not available'],
      },
      title: {
        text: null,
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high',
        },
        labels: {
          overflow: 'justify',
        },
      },
      tooltip: {
        valueSuffix: '',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true,
          },
        },
        series: {
          // depth: 75,
          colorByPoint: true,
        },
      },
      credits: { enabled: false },
      exporting: {
        sourceWidth: 2500,
        sourceHeight: 600,
        accessibility: {
          enabled: true,
        },
        allowHTML: false,
        buttons: {
          contextButton: {
            enabled: true,
          },
        },
        csv: {
          useLocalDecimalPoint: true,
          dateFormat: '%Y-%m-%d %H:%M:%S',
          itemDelimiter: ',',
          lineDelimiter: '\n',
          columnHeaderFormatter: null,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -80,
        y: 80,
        floating: true,
        borderWidth: 1,
        shadow: true,
      },

      series: [
        {
          type: 'cylinder',
          colorByPoint: true,
          data: [0],
          name: 'Concrete per type',
          showInLegend: false,
        },
      ],
    };
    this.httpService
      .call('hcnt/sales_per_customer', ApiMethod.GET, this.model)
      .subscribe((res: any) => {
        if (res.status) {
          this.data = res.list;
          this.total = res.total;
          this.chartOptions = {
            chart: {
              backgroundColor:
                this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
              type: 'cylinder',
              renderTo: 'container',
            },

            xAxis: {
              categories: res.customers,
            },
            title: {
              text: null,
            },
            yAxis: {
              min: 0,
              title: {
                text: '',
                align: 'high',
              },
              labels: {
                overflow: 'justify',
              },
            },
            tooltip: {
              valueSuffix: '',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                },
              },
              series: {
                // depth: 75,
                colorByPoint: true,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  // rotation: -90,
                  // y: 10,
                  format: '{point.y:,.0f}',
                },
              },
            },
            credits: { enabled: false },
            exporting: {
              sourceWidth: 2500,
              sourceHeight: 600,
              // accessibility: {
              //   enabled: true,
              // },
              // allowHTML: true,
              // buttons: {
              //   contextButton: {
              //     enabled: true,
              //   },
              // },
              // csv: {
              //   useLocalDecimalPoint: true,
              //   dateFormat: '%Y-%m-%d %H:%M:%S',
              //   itemDelimiter: ',',
              //   lineDelimiter: '\n',
              //   columnHeaderFormatter: null,
              // },
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -80,
              y: 80,
              floating: true,
              borderWidth: 1,
              shadow: true,
            },

            series: [
              {
                type: 'cylinder',
                colorByPoint: true,
                data: res.concretePrices,
                name: 'Concrete per type',
                showInLegend: false,
              },
            ],
            dataLabels: {
              enabled: true,
              rotation: -90,
              // color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              // style: {
              //     fontSize: '13px',
              //     // fontFamily: 'Verdana, sans-serif'
              // }
            },
          };
          this.chartOptions2 = {
            chart: {
              backgroundColor:
                this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
              type: 'cylinder',
              renderTo: 'container',
            },

            xAxis: {
              categories: res.customers,
            },
            title: {
              text: null,
            },
            yAxis: {
              min: 0,
              title: {
                text: '',
                align: 'high',
              },
              labels: {
                overflow: 'justify',
              },
            },
            tooltip: {
              valueSuffix: '',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  enabled: true,
                },
              },
              series: {
                // depth: 75,
                colorByPoint: true,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  // rotation: -90,
                  // y: 10,
                  format: '{point.y:,.0f}',
                },
              },
            },
            credits: { enabled: false },
            exporting: {
              sourceWidth: 2500,
              sourceHeight: 600,
              // accessibility: {
              //   enabled: true,
              // },
              // allowHTML: true,
              // buttons: {
              //   contextButton: {
              //     enabled: true,
              //   },
              // },
              // csv: {
              //   useLocalDecimalPoint: true,
              //   dateFormat: '%Y-%m-%d %H:%M:%S',
              //   itemDelimiter: ',',
              //   lineDelimiter: '\n',
              //   columnHeaderFormatter: null,
              // },
            },
            legend: {
              layout: 'vertical',
              align: 'right',
              verticalAlign: 'top',
              x: -80,
              y: 80,
              floating: true,
              borderWidth: 1,
              shadow: true,
            },

            series: [
              {
                type: 'cylinder',
                colorByPoint: true,
                data: res.concreteMeters,
                name: 'Concrete per type',
                showInLegend: false,
              },
            ],
            dataLabels: {
              enabled: true,
              rotation: -90,
              // color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              // style: {
              //     fontSize: '13px',
              //     // fontFamily: 'Verdana, sans-serif'
              // }
            },
          };
        }
      });
  }
 
}
