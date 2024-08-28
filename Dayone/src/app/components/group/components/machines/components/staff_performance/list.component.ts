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
  styleUrls: ['./list.component.scss']
})
export class PerformanceReportComponent implements OnInit {
  bercumberRoutes: any = [
    { icon: 'feather feather-home', route: '/home', name: 'Home' },
    { icon: 'feather feather-home', route: '/group', name: 'Group' },
    { icon: 'feather feather-home', route: '/group/machines', name: 'Machines' },

    // {
    //   icon: 'fe fe-codepen',
    //   route: '/visits',
    //   queryParams: { skip: 0, limit: 20, sort: 'name', cond: 'my_visits' },
    //   name: 'Visits',
    // },
  ];
  actions: any = [ ]
  DataIsLoading: boolean = false;
  Highcharts = Highcharts;
  alpha_pie: number = 40;
  alpha: number = 0;
  beta: number = 0;
  depth: number = 10;

  optionsSelect: any = [];
  dataLocation: any = [];

  yearsOption: any = [
    { label: '2018', value: '2018' },
    { label: '2019', value: '2019' },
    { label: '2020', value: '2020' },
    { label: '2021', value: '2021' },
    { label: '2022', value: '2022' },
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

  visits: any = [];
  tickets: any = [];
  work_and_activity: any = [];
  total_works: any;
  working_days_per_year: any;
  visit_for_user: any = {};
  work_and_activity_for_user: any = {};
  daily_form_for_user: any = {};
  daily_forms: any = [];
  tickets_for_user: any = {};
  apiEndPoint: any = environment.apiITDIMG + '/images/profile_photos/';

  it_staffs: any = [];
  user: any = {};

  chartTickets: any = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total work for staff',
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
        '<span style="color:{point.color}">{point.name}</span>: <b>%{point.y:.2f}</b> <br/>',
    },
    dataLabels: {
      enabled: true
    },
    series: [
      {
        name: 'Data',
        colorByPoint: true,
        data: [],
      },
    ],
  };

  chartActivity: any = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Total work for staff',
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
        '<span style="color:{point.color}">{point.name}</span>: <b>%{point.y:.2f}</b> <br/>',
    },

    series: [
      {
        name: 'Data',
        colorByPoint: true,
        data: [],
      },
    ],
  };
  tickets_chart: any = [];
  unit_kpi: any = [];
  employee_kpi: any = [];

  chartData: any = {};
  //Line Chart
  public MultipleChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    },
    elements: {
      line: {
        tension: 0.5,
      },
      point: {
        radius: 0,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        ticks: {
          beginAtZero: true,
          color: '#8492a6',
        },
        grid: {
          color: 'rgba(142, 156, 173,0.1)',
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: false,
          zeroLineColor: 'rgba(142, 156, 173,0.1)',
          color: 'rgba(142, 156, 173,0.1)',
        },
        ticks: {
          stepSize: 0,
          beginAtZero: true,
          color: '#8492a6',
        },
      },
    },

    plugins: {
      legend: { display: false },
    },
  };

  MultipleChartData: any = {
    datasets: [
      {
        label: 'Works',
        data: [],
        borderWidth: 3,
        backgroundColor: 'transparent',
        borderColor: '#3366ff',
        pointBackgroundColor: '#ffffff',
        pointRadius: 0,
      },
      {
        label: 'Normal work time',
        data: [6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5],
        borderWidth: 3,
        backgroundColor: 'transparent',
        borderColor: '#ccd9ff',
        pointBackgroundColor: '#ffffff',
        pointRadius: 0,
        type: 'line',
        borderDash: [7, 3],
      },
    ],
    labels: [
      '2022-01',
      '2022-02',
      '2022-03',
      '2022-04',
      '2022-05',
      '2022-06',
      '2022-07',
      '2022-08',
      '2022-09',
      '2022-10',
      '2022-11',
      '2022-12',
    ],
  };

  public MultipleChartType = 'line';
  monthly_avg: number = 0;
  calendar_off: any;
  monthly_working_days: any;
  monthly_leave: any;
  monthly_work: any;
  monthly_holidays: any;
  yearly_work: any;
  yearly_holidays: any;
  yearly_leave: any;
  yearly_working_days: number = 0;
  lang: string;

  constructor(
    private route: ActivatedRoute,
    private dic: DicService,
    private router: Router,
    private toastservice: ToastrService,
    private modalService: NgbModal,
    private http: HttpService
  ) {

    this.lang =this.dic.lang()
    this.route.queryParams.subscribe((params) => {
      if (params['year']) this.p.year = params['year'];
      if (params['month']) this.p.month = params['month'];
      if (!params['month']) this.p.month = 'all';
      if (params['staff_id']) this.p.staff_id = params['staff_id'];
    });
    route.queryParams.subscribe(() => {
      this.ngOnInit();
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
              // [1, Highcharts.color(color).brighten(-0.3).get('rgb')], // darken
            ],
          };
        }
      ),
    });

    this.http
      .call('group/machines/users', ApiMethod.GET, { skip: 0, limit: 10000, sort: 'name' })
      .subscribe((ptr: any) => {
        this.it_staffs = [];
        if (ptr.data)
          for (let index = 0; index < ptr.data.length; index++) {
            this.it_staffs.push({
              label: ptr.data[index].full_name,
              value: ptr.data[index]._id,
              profile_photo: ptr.data[index].profile_photo,
            });
          }
      });
  }

  sum(name: any, array: any) {
    var result = 0;
    for (let index = 0; index < array.length; index++) {
      result += array[index][name];
    }
    return result;
  }

  ngOnInit(): void {
    this.DataIsLoading = true;
    this.employee_kpi = [];
    this.unit_kpi = [];
    this.visits = [];
    this.tickets = [];
    this.work_and_activity = [];
    this.total_works = 0;
    this.working_days_per_year = 0;
    this.visit_for_user = {};
    this.work_and_activity_for_user = {};
    this.daily_forms = [];
    this.tickets_for_user = {};

    this.chartData = { data: [], labels: [] };

    if (this.p.year && !this.p.staff_id) {
      this.http
        .call('group/machines/employee_and_unit_kpi', ApiMethod.GET, {
          year: this.p.year,
        })
        .subscribe((ptr: any) => {
          this.DataIsLoading = false;
          this.employee_kpi = ptr.employee_kpi;
          this.unit_kpi = ptr.unit_kpi;
        });
    }

    this.yearly_work = 0
    this.yearly_holidays = 0 
    this.yearly_leave = 0
    this.yearly_working_days = 0

    if (this.p.year && this.p.staff_id) {
      this.monthly_avg = 0;
      this.http
        .call('group/machines/staff_report', ApiMethod.GET, {
          year: this.p.year,
          staff_id: this.p.staff_id,
        })
        .subscribe((ptr: any) => {
          this.DataIsLoading = false;
          this.daily_forms = [];
          this.visits = [];
          this.tickets = [];
          this.work_and_activity = [];
          this.total_works = 0;
          this.working_days_per_year = 0;
          this.visit_for_user = {};
          this.work_and_activity_for_user = {};
          this.daily_form_for_user = {};
          this.tickets_for_user = {};

          this.chartData = ptr.monthlyChart;

          this.user = ptr.user;
          if (ptr.status) {
            this.MultipleChartData = {
              datasets: [
                {
                  label: 'Works',
                  data: this.chartData.data,
                  borderWidth: 3,
                  backgroundColor: 'transparent',
                  borderColor: '#3366ff',
                  pointBackgroundColor: '#ffffff',
                  pointRadius: 0,
                },
                {
                  label: 'Normal work time',
                  data: [
                    6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5,
                  ],
                  borderWidth: 3,
                  backgroundColor: 'transparent',
                  borderColor: '#ff0000',
                  pointBackgroundColor: '#ffffff',
                  pointRadius: 0,
                  type: 'line',
                  borderDash: [7, 3],
                },
              ],
              labels: this.chartData.labels,
            };
            // console.log(this.MultipleChartData);

            this.daily_forms = ptr.daily_forms;
            this.tickets = ptr.tickets;
            this.tickets_chart = ptr.tickets_chart;
            this.work_and_activity = ptr.work_and_activity;
            this.total_works = ptr.total_works;
            this.working_days_per_year = ptr.working_days_per_year;
            this.work_and_activity_for_user = ptr.work_and_activity_for_user;
            this.visit_for_user = ptr.visit_for_user;
            this.daily_form_for_user = ptr.daily_form_for_user;
            this.tickets_for_user = ptr.tickets_for_user;



          this.yearly_holidays = ptr.calendar.calendar
          this.yearly_leave = ptr.calendar.leaves
          this.yearly_working_days = 365 - ptr.calendar.calendar
      

            this.chartTickets = {
              chart: {
                type: 'pie',
                renderTo: 'container',
                // options3d: {
                //   enabled: true,
                //   alpha: this.alpha_pie,
                //   beta: this.beta,
                //   depth: this.depth,
                //   viewDistance: 95,
                // },
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
              dataLabels: {
                enabled: true
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
                sourceWidth: 2000,
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
                //     data: this.dataTicketForCompany.hours
                //   },
                {
                  colorByPoint: true,
                  data: this.tickets_chart,
                },
              ],
            };
            this.chartActivity = {
              chart: {
                type: 'pie',
                renderTo: 'container',
                // options3d: {
                //   enabled: true,
                //   alpha: this.alpha_pie,
                //   beta: this.beta,
                //   depth: this.depth,
                //   viewDistance: 95,
                // },
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

                    format: '{point.feild} - %{point.y:.1f}',
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
                      return (
                        '<div style="font-size:14px"><b>' +
                        point.feild +
                        '</b></div><div><b>:' +
                        point.y +
                        ' </b></div>'
                      );
                    },
                  },
                },
              },
              exporting: {
                sourceWidth: 2000,
                sourceHeight: 600,
              },
              credits: {
                enabled: false,
              },
              tooltip: {
                headerFormat:
                  '<span style="font-size:11px">{series.feild}</span><br>',
                pointFormat:
                  '<span style="color:{point.color}">{point.feild}</span>: <b>%{point.y:.2f}</b> <br/>',
              },
              series: [
                //       {
                //     data: this.dataTicketForCompany.hours
                //   },
                {
                  colorByPoint: true,
                  data: this.work_and_activity,
                },
              ],
            };
          }
        });
    }
  }

  changeLeave(event: any) {
   
    this.p.leave = event
    if (event == true) {
      this.monthly_avg =
      (this.monthly_work + this.monthly_leave) / this.monthly_working_days
    }
    if (event == false) {
      this.monthly_avg = this.monthly_work / this.monthly_working_days;
    }
  }

  changeMonth(event?: any) {

    this.monthly_work = 0
    this.monthly_holidays = 0
    this.monthly_leave = 0
    this.monthly_working_days = 0
 
    this.monthly_avg = 0;
    // console.log(event);
    // console.log(this.p.month);
    if (!this.p.month || this.p.month == 'all') {
      console.log('reload');
      this.ngOnInit();
      // this.searchYear(this.p.year)
      return;
    }
    this.http
      .call('group/machines/staff_monthly_report', ApiMethod.GET, {
        year: this.p.year,
        month: this.p.month,
        staff_id: this.p.staff_id,
        leave: this.p.leave,
      })
      .subscribe((ptr: any) => {
        this.DataIsLoading = false;

        this.monthly_work = ptr.works
        this.monthly_holidays = ptr.calendar
        this.monthly_leave = ptr.time_off
        this.monthly_working_days = ptr.days
     
        
        if (this.p.leave == true) {
          this.monthly_avg =
            (this.monthly_work + this.monthly_leave) / this.monthly_working_days;
        }
        if (this.p.leave == false) {
          this.monthly_avg = this.monthly_work / this.monthly_working_days;
        }

        // this.MultipleChartData = {
        //   datasets: [
        //     {
        //       label: 'Works',
        //       data: ptr.monthlyChart.data,
        //       borderWidth: 0,
        //       backgroundColor: '#3366ff',
        //       borderColor: '#3366ff',
        //       pointBackgroundColor: '#3366ff',
        //       pointRadius: 0,
        //       type: 'bar',
        //     },
        //     {
        //       label: 'Normal work time',
        //       data: [
        //         6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5,
        //         6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5, 6.5,
        //         6.5, 6.5, 6.5, 6.5, 6.5,
        //       ],
        //       borderWidth: 0,
        //       backgroundColor: 'transparent',
        //       borderColor: '#ff0000',
        //       pointBackgroundColor: '#ff0000',
        //       pointRadius: 4,
        //       type: 'line',
        //       // borderDash: [10],
        //     },
        //     {
        //       label: 'Full',
        //       data: [
        //         8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        //         8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
        //       ],
        //       borderWidth: 0,
        //       backgroundColor: 'transparent',
        //       borderColor: '#00ff00',
        //       pointBackgroundColor: '#00ff00',
        //       pointRadius: 4,
        //       type: 'line',
        //       // borderDash: [10],
        //     },
        //   ],
        //   labels: ptr.monthlyChart.labels,
        // };
        // this.MultipleChartType = 'bar'
        // this.MultipleChartOptions = 
       this.barChartData = [
        { data:  ptr.monthlyChart.data, label: 'Work', stack: 'a' },
        { data:  ptr.monthlyChart.leaves, label: 'Leave', stack: 'a' },
        { data:  ptr.monthlyChart.calendar, label: 'Holidays', stack: 'a' },
        ];
        var labels =  ptr.monthlyChart.labels
        labels = labels.map((label:any,i:any) =>{return label+' '+ptr.monthlyChart.dd[i]})
       
        this.barChartLabels  = labels;
       
     
      });
  }
  public barChartColors: any[] = [{
    backgroundColor: 'transparent',
    borderColor: '#3366ff',
    pointBackgroundColor: '#ffffff',
  },
  {
    backgroundColor: 'transparent',
    borderColor: '#ccd9ff',
    pointBackgroundColor: '#ffffff',
  }]
  chartColors:any = ['#ff0000', '#b000b5',]
  public barChartOptions: any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        font: {
          size: 20,
          color:"#000000",
        }
      }
    }
   
  };

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: any =[
    // { data: [6,1.3], label: 'Work', stack: 'a' },
    // { data: [1,2], label: 'Leave', stack: 'a' },
  ];
  public barChartLabels: any[] = ['W', 'L'];

  
  fillMissingDays(data) {
    const labels = data.monthlyChart.labels;
    const originalData = data.monthlyChart.data;
    const updatedLabels: any = [];
    const updatedData: any = [];
    let currentDate = new Date(labels[0]);
    let currentIndex = 0;

    if (labels[0].slice(9, 10) !== '1') {
      updatedLabels.push(labels[0].slice(0, 9) + '1');
      updatedData.push(0);
      // currentIndex++;
    }
    if (labels[0].slice(9, 10) !== '2') {
      updatedLabels.push(labels[0].slice(0, 9) + '2');
      updatedData.push(0);
      // currentIndex++;
    }
    console.log(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    const firstDayOfNextMonth = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth(),
      1
    );
    console.log(firstDayOfNextMonth);

    // Add a new item to the data array for each day of the month
    while (currentDate <= firstDayOfNextMonth) {
      // Check if the current date is a Friday or Saturday
      const dayOfWeek = currentDate.getDay();
      if (dayOfWeek === 5 || dayOfWeek === 6) {
        // Fill in a 0 value for the missing day
        updatedData.push(0);
        updatedLabels.push(currentDate.toISOString().slice(0, 10));
      } else {
        // Use the original data if it exists
        if (
          currentIndex < originalData.length &&
          labels[currentIndex] === currentDate.toISOString().slice(0, 10)
        ) {
          updatedData.push(originalData[currentIndex]);
          currentIndex++;
          updatedLabels.push(currentDate.toISOString().slice(0, 10));
        } else {
          // Fill in a 0 value for the missing day
          updatedData.push(0);
          updatedLabels.push(currentDate.toISOString().slice(0, 10));
        }
      }

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Update the data array in the original object
    data.monthlyChart.data = updatedData;
    data.monthlyChart.labels = updatedLabels;
    return data;
  }

  searchYear(e: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year: e, staff_id: this.p.staff_id },
    });
  }

  back() {
    delete this.p.staff_id;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year: this.p.year },
    });
  }

  searchStaff(e: any) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { year: this.p.year, staff_id: e },
    });
  }
}
