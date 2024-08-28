import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
export interface Color {
    backgroundColor?: string | string[];
    borderWidth?: number | number[];
    borderColor?: string | string[];
    borderCapStyle?: string;
    borderDash?: number[];
    borderDashOffset?: number;
    borderJoinStyle?: string;
    pointBorderColor?: string | string[];
    pointBackgroundColor?: string | string[];
    pointBorderWidth?: number | number[];
    pointRadius?: number | number[];
    pointHoverRadius?: number | number[];
    pointHitRadius?: number | number[];
    pointHoverBackgroundColor?: string | string[];
    pointHoverBorderColor?: string | string[];
    pointHoverBorderWidth?: number | number[];
    pointStyle?: string | string[];
    hoverBackgroundColor?: string | string[];
    hoverBorderColor?: string | string[];
    hoverBorderWidth?: number;
}


export let ApexSparklines1 = {
    series: [{
        data: [2, 4, 3, 4, 5, 4,5,3,4,5,2,4,5,4,3,5,4,3,4,5,4,5,4,3,5,4,3,4,5]
    }],
    colors: ['#fa057a'],
    chart: {
        type: 'bar',
        width: 350,
        height: 50,
        sparkline: {
            enabled: true,
        },
        
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }  
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName:any) {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
}
export let ApexSparklines2 = {
    series: [{
        data: [3, 5, 4, 4, 5, 4,5,3,4,5,3,4,5,4,3,5,4,3,4,5,4,5,4,3,5,4,3,4,5]
    }],
    colors: ['#f7346b'],
    chart: {
        type: 'bar',
        width: 350,
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName:any) {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
}
export let ApexSparklines3 = {
    series: [{
        data: [3, 5, 4, 4, 5, 4,5,3,4,5,3,4,5,4,3,5,4,3,4,5,4,5,4,3,5,4,3,4,5]
    }],
    colors: ['#2dce89'],
    chart: {
        type: 'bar',
        width: 350,
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName:any) {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
}  
export let ApexSparklines4 = {
    series: [{
        data: [3, 5, 4, 4, 5, 4,5,3,4,5,3,4,5,4,3,5,4,3,4,5,4,5,4,3,5,4,3,4,5]
    }],
    colors: ['#45aaf2'],
    chart: {
        type: 'bar',
        width: 350,
        height: 50,
        sparkline: {
            enabled: true
        }
    },
    plotOptions: {
        bar: {
            columnWidth: '50%',
        }
    },

    tooltip: {
        fixed: {
            enabled: false
        },
        x: {
            show: false
        },
        y: {
            title: {
                formatter: function (seriesName:any) {
                    return "";
                }
            }
        },
        marker: {
            show: true
        }
    }
}

export let ApexData1 = {
    chart: {
        type: 'area',
        height: 60,
		width: 160,
        sparkline: {
          enabled: true
        },
		dropShadow: {
			enabled: true,
			blur: 3,
			opacity: 0.2
		}
		},
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 2,
			dashArray: 0,
		},
      fill: {
        gradient: {
          enabled: false
        }
      },
      series: [{
		name: 'Total Revenue',
        data: [0, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46]
      }],
      yaxis: {
        min: 0
      },
      colors: ['#3366ff'],
};
export let ApexData2 = {
    chart: {
        type: 'area',
        height: 60,
		width: 160,
        sparkline: {
          enabled: true
        },
		dropShadow: {
			enabled: true,
			blur: 3,
			opacity: 0.2
		}
		},
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 2,
			dashArray: 0,
		},
		fill: {
        gradient: {
          enabled: false
        }
      },
      series: [{
		name: 'Unique Visitors',
        data: [0, 45, 93, 53, 61, 27, 54, 43, 19, 46, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41, 35, 27, ]
      }],
      yaxis: {
        min: 0
      },
      colors: ['#664dc9'],
}
export let ApexData3 = {
    chart: {
        type: 'area',
        height: 60,
		width: 160,
        sparkline: {
          enabled: true
        },
		dropShadow: {
			enabled: true,
			blur: 3,
			opacity: 0.2
		}
		},
		stroke: {
			show: true,
			curve: 'smooth',
			lineCap: 'butt',
			colors: undefined,
			width: 2,
			dashArray: 0,
		},
		fill: {
        gradient: {
          enabled: false
        }
      },
      series: [{
		name: 'Expenses',
        data: [0, 35, 41, 35, 27, 93, 53, 61, 27, 54, 43, 19, 46,45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51]
      }],
      yaxis: {
        min: 0
      },
      colors: ['#ff5b51'],
}

//Line Charts

export const lineChartOptions: ChartConfiguration['options'] | any = {
    elements: {
        line: {
            tension: 0.4,
        },
    },
    scales: {
        x: {
            grid: {
                color: 'transparent',
                zeroLineColor: 'transparent'
            },
            ticks: {
                fontSize: 2,
                fontColor: 'transparent'
            },
            display:false,
        },
        y: {
            grid: {
                color: 'transparent',
                zeroLineColor: 'transparent'
            },
            display:false,
            ticks: {
                display: false,
            }
        }
        
    },
    
    plugins: {
    legend: { display: false },
    annotation: {
        annotations: [
            {
        type: 'line',
        borderColor: 'transparent',
        borderWidth: 1,
    },
],
}
}
};

export const lineChartType: ChartType = 'line';

export const lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [83,56,89, 73, 61, 75, 86, 56],
        label: 'Market value',
        backgroundColor: 'rgba(51, 102, 255,0.06)',
        borderColor: 'rgba(51, 102, 255,0.6)',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3,
        pointHoverBackgroundColor: 'rgba(51, 102, 255,0.6)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
export const lineChartData1: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [45,78,67,78,36,78,89,84],
        label: 'Nem',
        backgroundColor: 'rgba(51, 102, 255,0.06)',
        borderColor: 'rgba(51, 102, 255,0.6)',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3,
        pointHoverBackgroundColor: 'rgba(51, 102, 255,0.6)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
export const lineChartData2: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [56,78,36,78,29,78,37,56],
        label: 'Ripple',
        backgroundColor: 'rgba(51, 102, 255,0.06)',
        borderColor: 'rgba(51, 102, 255,0.6)',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3,
        pointHoverBackgroundColor: 'rgba(51, 102, 255,0.6)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
export const lineChartData3: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [45,78,98,34,67,28,89,45],
        label: 'Neo',
        backgroundColor: 'rgba(51, 102, 255,0.06)',
        borderColor: 'rgba(51, 102, 255,0.6)',
        pointBackgroundColor: 'transparent',
        pointBorderColor: 'transparent',
        borderWidth: 3,
        pointHoverBackgroundColor: 'rgba(51, 102, 255,0.6)',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};
