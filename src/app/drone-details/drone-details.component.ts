import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Chartist from 'chartist';
import { DroneDetailsService } from './drone-details.service';

const tooltip = require('chartist-plugin-tooltip');

@Component({
  selector: 'app-drone-details',
  templateUrl: './drone-details.component.html',
  styleUrls: ['./drone-details.component.scss']
})
export class DroneDetailsComponent implements OnInit {

  constructor(private droneDetailsService: DroneDetailsService,
    private route: ActivatedRoute) { }

  droneId;
  droneTelemetries;
  latestStatus;
  range = "Hour"

  startAnimationForLineChart(chart){
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function(data) {
      if(data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if(data.type === 'point') {
            seq++;
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
    });

    seq = 0;
};
startAnimationForBarChart(chart){
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function(data) {
      if(data.type === 'bar'){
          seq2++;
          data.element.animate({
            opacity: {
              begin: seq2 * delays2,
              dur: durations2,
              from: 0,
              to: 1,
              easing: 'ease'
            }
          });
      }
    });

    seq2 = 0;
};

sendMessage(){
  // this.droneDetailsService._send("hello")
    
}





ngOnInit() {

  this.route.params.subscribe(params => {
    this.droneId = params["id"];
  })
  let dateString = []
  let yaw = []

  const dataDailySalesChart: any = {
    labels: dateString,
    series: [
       yaw
    ]
};

    var optionsDailySalesChart: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: Math.min(...yaw),
    high: Math.max(...yaw), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    plugins:[
      tooltip()
    ],
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
    }

    // var optionswebsiteViewsChartYaw = {
    //   axisX: {
    //       showGrid: false
    //   },
    //   low: Math.min(...yaw),
    //   high: Math.max(...yaw),
    //   chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    // };
    var responsiveOptionsYaw: any[] = [
    ['screen and (max-width: 640px)', {
      seriesBarDistance: 5,
      axisX: {
        showLabel: false,
      }
    }]
    ];



    var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart, responsiveOptionsYaw);

    this.startAnimationForBarChart(dailySalesChart);


  this.droneDetailsService.getTelemetry(this.droneId, this.range).subscribe(res => {
    this.droneTelemetries = res;
    let dateList: Array<any> = this.droneTelemetries["dateList"]
    dateString = dateList.map(e => {
      if(this.range == "Hour"){
        return new Date(e).toLocaleTimeString([], {hour12: false, hour:"2-digit", minute:"2-digit"});
      }
      else if(this.range == "Day"){
        return new Date(e).toLocaleTimeString([], {hour12: false, hour:"2-digit", minute:"2-digit"});
      }
      else if(this.range == "Month"){
        let date = new Date(e);
        return date.getDate().toString() + "/" +(date.getMonth() + 1).toString();
      }

    })
    let telemetries: Array<any> = this.droneTelemetries["droneTelemetryDTOList"]
    yaw = telemetries.map(e => {
      if(e){
        return e["yaw"]
      }
      else{
        return null;
      }
    })
    let data = {
      labels: dateString,
      series: [
         yaw
      ]
  };
  optionsDailySalesChart= {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
    }),
    low: Math.min(...yaw),
    high: Math.max(...yaw), // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    plugins:[
      tooltip()
    ],
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
    }
    dailySalesChart.update(data, optionsDailySalesChart);




    // console.log(this.droneTelemetries);
  });

  

  


    /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    const dataCompletedTasksChart: any = {
        labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
        series: [
            [230, 750, 450, 300, 280, 240, 200, 190]
        ]
    };

   const optionsCompletedTasksChart: any = {
        lineSmooth: Chartist.Interpolation.cardinal({
            tension: 0
        }),
        low: 0,
        high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
        chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    }

    var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    // start animation for the Completed Tasks Chart - Line Chart
    this.startAnimationForLineChart(completedTasksChart);



    /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    var datawebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [
        [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

      ]
    };
    var optionswebsiteViewsChart = {
        axisX: {
            showGrid: false
        },
        low: 0,
        high: 1000,
        chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
}

}
