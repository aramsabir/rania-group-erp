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
  selector: 'app-abf-revenue-per-month',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class RevenuePerMonthComponent implements OnInit {
  params: any = {};
  apiUrl: string;
  titlePage: string = "Revenue per month";
  lang: string;
  model: any = {};
  govs: any = GOVS;
  

  darkChartStyle: any = {
    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
    stops: [
      [0, '#2a2a2b'],
      [1, '#3e3e40'],
    ],
  };

  Highcharts: typeof Highcharts = Highcharts; // required
  chartOptions: any = {};

  actions:any =[]
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'fe fe-activity', route: '/aso-bricks/main', name: 'Aso Brick Factory' },
  ];

  themeStyle: any = 'light';
  data: any = [];
  detailData: any = [];
  total: any = {};
  brickTypes: any = [];
  public allowSearch: boolean = true;
  detailCat: any;
  totalDetail: any = {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dic: DicService,
    private httpService: HttpService
  ) {

    this.route.queryParams.subscribe((params: any) => {
      this.model.from_date = params.from_date;
      this.model.to_date = params.to_date;
      this.getData();

    });

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
        enabled: false,
        floating: true,
        borderWidth: 1,
        shadow: true,
      },

      series: [
        {
          type: 'cylinder',
          colorByPoint: true,
          data: [0],
          name: 'Brick per type',
          showInLegend: false,
        },
      ],
      drilldown: {
        series: [
          
        ]
      }
    };

    Highcharts.setOptions({
      lang: {
        decimalPoint: '.',
        thousandsSep: ','
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

    this.getBrickTypes();
  }

  search(){
    this.router.navigate([],{queryParams:this.model})
  }

  getBrickTypes(){
    this.httpService
    .call('abf/brick_types', ApiMethod.GET, {})
    .subscribe((res: any) => {
      if (res.status) {
        this.brickTypes = res.data
      }
    })
  }

  ngOnInit(): void {}

  getData() {
  
    this.total = {};
    this.data = [];
    this.chartOptions = {
      chart: {
        backgroundColor:
          this.themeStyle === 'dark' ? this.darkChartStyle : 'none',
        type: 'cylinder',
        renderTo: 'container',
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
      accessibility: {
        announceNewData: {
            enabled: true
        },
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
          name: 'Brick per type',
          showInLegend: false,
        },
      ],
      drilldown: {
        series: [
          
        ],
      },
    };
    this.httpService
      .call('abf/sales_by_month', ApiMethod.GET, this.model)
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
              
              allowDrillToNode: true,
              cursor: 'pointer',
              events:{
                drilldown:(a:any)=> {
                  this.detailCat = a.seriesOptions.name
                  this.detailData = a.seriesOptions.data
                  this.totalDetail.ton = 0
                  this.totalDetail.price = 0
                  this.totalDetail.qty = 0
                  this.totalDetail.orders = 0
                  
                  for (let index = 0; index < this.detailData.length; index++) {
                    this.totalDetail.ton += this.detailData[index][4]
                    this.totalDetail.qty += this.detailData[index][5]
                    this.totalDetail.orders += this.detailData[index][3]
                    this.totalDetail.price += this.detailData[index][1]
                  }
                  document.getElementById('search_row')!.style.display = "none";
                },
                drillup:()=> {
                  this.detailData = []
                  this.totalDetail.ton = 0
                  this.totalDetail.price = 0
                  this.totalDetail.qty = 0
                  this.totalDetail.orders = 0
                  document.getElementById('search_row')!.style.display = "block";
                }
              }
            },
         
            xAxis: {
              // categories: res.category,
              type: 'category'

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
            
            plotOptions: {
              bar: {
                allowPointSelect: true,
                dataLabels: {
                  enabled: true,
                },
              },
              dataLabels: {
                enabled: true,
            },
              series: {
                // depth: 75,
                "cropThreshold": 300 ,
                colorByPoint: true,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  // rotation: -90,
                  // y: 10,
                  format: '{point.y:,.0f}'
                },
                
              },
            },
            credits: { enabled: false },
            exporting: {
              sourceWidth: 2500,
              sourceHeight: 600,
         
            },
            legend: {
              layout: 'vertical',
              align: 'left',
              verticalAlign: 'buttom',
              x: -80,
              enabled:false,
              y: 80,
              floating: true,
              borderWidth: 1,
              shadow: true,
            },

            series: [
              {
                type: 'column',
                colorByPoint: true,
                data: res.data,
                name: 'Total price',
                showInLegend: false,
              },
            ],
            drilldown: {
              drillUpButton: {
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: 'white',
                    'stroke-width': 1,
                    stroke: 'silver',
                    r: 0,
                    states: {
                        hover: {
                            fill: '#bada55'
                        },
                        select: {
                            stroke: '#039',
                            fill: '#bada55'
                        }
                    }
                }
            },
            //   breadcrumbs: {
            //     position: {
            //         align: 'left'
            //     }
            // },
              series: res.drilldown,
            },
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
          }
          };
          
        }
       
      
      });
   
   
  }

 
}
