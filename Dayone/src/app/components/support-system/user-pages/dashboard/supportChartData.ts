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
        barPercentage: 0.8,
				label: 'Total Open Tickets',
				categoryPercentage: 0.4,
				data: [20,17,27,23,17,19,23,17,13,28,22,27],
        backgroundColor: '#dbe2fc',
        borderWidth: 2,
        hoverBackgroundColor: '#dbe2fc',
        hoverBorderWidth: 0,
        borderColor: '#dbe2fc',
        hoverBorderColor: '#dbe2fc',
        borderRadius: 50
    },
      { barPercentage: 0.8,
        label: 'Total Closed Tickets',
				categoryPercentage: 0.4,
				data: [28,22,21,18,13,22,24,18,16,21,18,24],
        borderWidth: 3,
        backgroundColor: '#3366ff',
        hoverBackgroundColor: '#3366ff',
        borderColor: '#3366ff',
        borderRadius: 50
     }
    ]
  };

// //BarChart2
export const barChartOptions1: ChartConfiguration['options'] = {
    
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
  export const barChartType1: ChartType = 'bar';
  export const barChartPlugins1 = [
    DataLabelsPlugin
  ];
  export const barChartData1: ChartData<'bar'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      { 
        barPercentage: 0.8,
        label: 'Total Assigned Tickets',
				categoryPercentage: 0.2,
				data: [20, 17, 14, 13, 17, 19, 20, 17, 13, 18, 12, 17],
        backgroundColor: '#3366ff',
        borderWidth: 2,
        hoverBackgroundColor: '#3366ff',
        hoverBorderWidth: 0,
        borderColor: '#3366ff',
        hoverBorderColor: '#3366ff',
    },
      { 
        label: 'Total Closed Tickets',
				categoryPercentage: 0.2,
				barPercentage: 0.8,
				data: [28, 22, 21, 28, 23, 22, 24, 28, 26, 25, 28, 24],
        backgroundColor: '#fe7f00',
        borderWidth: 2,
        hoverBackgroundColor: '#fe7f00',
        hoverBorderWidth: 0,
        borderColor: '#fe7f00',
        hoverBorderColor: '#fe7f00',
        borderRadius: 50
     },
     {
        label: '',
        categoryPercentage: 0.2,
        barPercentage: 0.8,
        data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30],
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
    pieseries: [64, 45],
    colors: ['#3366ff', '#fe7f00'],
    labels: ["New Tickets", "Closed Tickets"],
    chart: {
        type: 'donut',
        height: 280,
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