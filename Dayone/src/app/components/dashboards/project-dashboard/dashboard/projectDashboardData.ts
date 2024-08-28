import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export declare type SingleLineLabel = string;
export declare type MultiLineLabel = string[];
export declare type Label = SingleLineLabel | MultiLineLabel;

//Line Charts
export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
				label: 'on going',
				data: [12, 20, 23, 18, 26, 25, 29.9, 25.5, 23, 25, 27, 18],
				backgroundColor: 'transparent',
				borderWidth: 3,
				borderColor: '#3366ff',
				hoverBorderColor: '#3366ff',
			},{
				label: 'Completed',
				data: [15, 17, 9.2, 20, 23, 17, 10, 25.2, 25, 18, 22, 20],
				backgroundColor: 'transparent',
				borderWidth: 3,
				borderColor: '#fe7f00',
				hoverBorderColor: '#fe7f00',

			}, {
			    label: '',
          data: [18, 18, 15, 23, 20, 16, 22, 18, 20, 24, 15, 22],
          backgroundColor: '#3654afde',
          borderWidth: 3,
          borderColor:'#3654afde',
          fill: 'origin'
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
            stepSize: 5,
            color: "#8492a6",
        },
      }
    },
  
    plugins: {
      legend: { display: false },
    }
  };
  
  export const lineChartType: ChartType = 'line';

// donut
  export let DonutChartData: any = {
    pieseries: [64, 35],
    colors: ['#3366ff', '#fe7f00'],
    labels: ["Completed","Running"],
    chart: {
        type: 'donut',
        height: 260,
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