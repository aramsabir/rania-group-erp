import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
  
// //BarChart1
export const barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
        padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 20
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
                stepSize: 5,
                color: "#8492a6",
            },
            
        },
        x: {
            stacked: false,
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
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { 
        label: 'Projects',
        categoryPercentage: 0.45,
        data: [27, 18, 27, 23, 17, 19, 22.5, 19.5, 17.5, 18.5, 19.8, 27],
        borderWidth: 0,
        backgroundColor: '#dbe2fc',
        borderColor: '#dbe2fc',
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
        borderRadius: 50
    },
      { 
        label: 'Expenses',
        categoryPercentage: 0.45,
        data: [29.5, 22, 23, 17, 20.5, 21, 24.8, 17, 15.8, 21, 22, 28.5],
        borderWidth: 0,
        backgroundColor: '#3366ff',
        borderColor: '#3366ff',
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        borderRadius: 50
     }
    ]
  };
  
  

  export let DonutChartData: any = {
    pieseries: [62, 23, 15],
    labels: ["Design","Development" , "Service"],
    colors: ['#3366ff', '#fe7f00' , '#0dcd94'],
    chart: {
        type: 'donut',
        height: 250,
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
                show: false
            },
        }
    }]
};

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
        {
            label: 'Expenses',
            data: [15, 32, 15, 38, 18, 25,  22],
            backgroundColor: 'transparent',
            borderWidth: 3,
            borderColor: '#3366ff',
            hoverBorderColor: '#3366ff',
        },
        {
            label: '',
            data: [25, 28, 21, 33, 18, 36, 18],
            backgroundColor: '#3654afde',
            borderWidth: 3,
            borderColor:'#3654afde',
            fill: 'origin'
        }
    ],
    labels: ['2015', '2016', '2017', '2018', '2019', '2020'],
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
            stepSize: 10,
            color: "#8492a6",
        },
      }
    },
  
    plugins: {
      legend: { display: false },
    }
  };
  
  export const lineChartType: ChartType = 'line';

