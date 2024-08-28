
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
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
      x: {
        stacked: false,
        ticks: {
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
            color: "rgba(142, 156, 173,0.1)",
        },
        ticks: {
            stepSize: 5,
            color: "#8492a6"
        },
      }
    },
    plugins: {
      legend: {
        display: true,
        labels:{
          color: '#a8b3d7'
        }
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
      { barPercentage: .8,
        categoryPercentage: 0.38,
        label: 'TOTAL BUDGET',
        data: [27,17,19,23,17,19,23,17,13,28,22,27],
        borderWidth: 0,
        backgroundColor: '#ccd9ff',
        borderColor: '#ccd9ff',
        hoverBackgroundColor: '#ccd9ff',
        hoverBorderColor: '#ccd9ff',
        borderRadius: 50
    },
    { 
      label: 'AMOUNT USED',
      barPercentage: .8,
      categoryPercentage: 0.38,
      data: [28,22,21,18,13,22,24,18,16,21,18,24],
      borderWidth: 0,
      backgroundColor: '#3366ff',
      borderColor: '#3366ff',
      hoverBackgroundColor: '#3366ff',
      hoverBorderColor: '#3366ff',
      borderRadius: 50
    }]

  };
  

    export let DonutChartData: any = {
    pieseries: [14, 8, 20, 18],
    labels: ["Casual Leaves","Sick Leaves", "Gifted Leaves", "Remaining Leaves"],
    colors: ['#3366ff', '#f7284a', '#fe7f00', '#01c353'],
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