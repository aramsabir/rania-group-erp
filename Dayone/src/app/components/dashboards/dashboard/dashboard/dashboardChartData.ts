import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        label: 'Total BUdget',
        data: [100, 210, 180, 454, 454, 230, 230,656,656,350,350, 210, 410],
        borderWidth: 3,
        backgroundColor: 'transparent',
        borderColor: '#3366ff',
        pointBackgroundColor: '#ffffff',
        pointRadius: 0,
      },
      {
        label: 'Total Employess',
        data: [200, 530, 110, 110, 480, 520, 780,435,475,738, 454, 454, 230,],
        borderWidth: 3,
        backgroundColor: 'transparent',
        borderColor: '#ccd9ff',
        pointBackgroundColor: '#ffffff',
        pointRadius: 0,
        type: 'line',
        borderDash: [7,3],
      }
    ],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  };
  
  export const lineChartOptions: ChartConfiguration['options'] | any = {

    responsive: true,
    maintainAspectRatio: false,
    layout:{
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    elements: {
      line: {
        tension: 0.5
      },
      point: {
        radius: 0
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {
        ticks: {
            beginAtZero: true,
            color: "#8492a6",
        },
        grid: {
            color: "rgba(142, 156, 173,0.1)",
            display: false
        },
      },
      y: {
        grid: {
            display: true,
            drawBorder: false,
            zeroLineColor: 'rgba(142, 156, 173,0.1)',
            color: "rgba(142, 156, 173,0.1)",
        },
        ticks: {
            stepSize: 150,
            color: "#8492a6",
        },
      }
    },
  
    plugins: {
      legend: { display: false },
    }
  };
  
  export const lineChartType: ChartType = 'line';


  
// //BarChart1
export const barChartOptions: ChartConfiguration['options'] = {
    
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    },
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
        
        y: {
            beginAtZero: true,
            grid: {
                display: true,
                drawBorder: false,
                color: "rgba(142, 156, 173,0.1)",
            },
            ticks: {
                color: "#8492a6",
            },
            
        },
        x: {
            stacked: true,
            ticks: {
                color: "#8492a6",
            },
            grid: {
                color: "rgba(142, 156, 173,0.1)",
                display: false
            },

        }
    },
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false
      }
    }
  };
  export const barChartType: ChartType = 'bar';
  export const barChartPlugins = [
    DataLabelsPlugin
  ];
  export const barChartData: ChartData<'bar'> = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri" ,"Sat"],
    datasets: [
      { 
        barPercentage: 0.15,
        label: 'This Month',
        data: [27, 50, 28,50,18,30,22],
        backgroundColor: '#3366ff',
        borderWidth: 2,
        hoverBackgroundColor: '#3366ff',
        hoverBorderWidth: 0,
        borderColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        // borderDash: [5,2]
    },
      { barPercentage: 0.15,
        label: 'Last Month',
        data: [68, 57, 53,58,23,75,28 ],
        backgroundColor: '#fe7f00',
        borderWidth: 2,
        hoverBackgroundColor: '#fe7f00',
        hoverBorderWidth: 0,
        borderColor: '#fe7f00',
        hoverBorderColor: '#fe7f00',
        borderRadius: 50
     },
     {
        barPercentage: 0.15,
        label: 'Last Month',
        data: [100, 78, 68,95,0,98, 58],
        backgroundColor: '#dbe2fc',
        borderWidth: 2,
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderWidth: 0,
        borderColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
     }
    ]
  };
  
  

  export let DonutChartData: any = {
    pieseries: [64, 35],
    colors: ['#3366ff', '#fe7f00'],
    labels: ["Male","Female"],
    chart: {
        type: 'donut',
        height: 300,
    },
    dataLabels: {
        enabled: false
    },
    legend: {
        show: false,
    },
    stroke: {
       show: true,
       width:0
   },
    responsive: [{
        breakpoint: 480,
        options: {
            chart: {
                width: 200,
            },
            legend: {
                show: false,
                position: 'bottom'
            },
        }
    }]
};