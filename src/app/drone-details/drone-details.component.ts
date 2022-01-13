import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
import { DroneDetailsService } from './drone-details.service';

const tooltip = require('chartist-plugin-tooltip');
const zoom = require('chartist-plugin-zoom');

@Component({
  selector: 'app-drone-details',
  templateUrl: './drone-details.component.html',
  styleUrls: ['./drone-details.component.scss']
})
export class DroneDetailsComponent implements OnInit, OnDestroy {

  constructor(private droneDetailsService: DroneDetailsService,
    private route: ActivatedRoute,
    private router: Router) { }
  
    ngOnDestroy(): void {
      this.poll.unsubscribe();
    }

  lat;
  long;

  customStyle = [{  
    "elementType": "all",  
    "stylers": [{  
        visibility: "off",  
    }]  
  }, ];  

  droneId;
  droneTelemetries;
  latestStatus;
  range = "Day"
  dateString = []
  yaw = []
  pitch = []
  roll = []
  velocityX = []
  velocityY = []
  velocityZ = []
  lastUpdatedAttitude = ""
  attitudeChart
  velocityChart
  poll: Subscription
  isNewDrone = true;
  drone;
  hasConfigFile = false;

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



map: google.maps.Map;

onSelectRange(value){
  this.range = value;
  this.stopPoll();
  this.startPoll();
}

startPoll(){
  this.poll = this.droneDetailsService.getTelemetry(this.droneId, this.range).subscribe(res => {
    this.droneTelemetries = res;
    this.latestStatus = this.droneTelemetries["latestTelemetry"];
    if(this.latestStatus['id']){
      this.isNewDrone = false;
    }
    let dateList: Array<any> = this.droneTelemetries["dateList"];
    this.lat = this.latestStatus["globalLat"];
    this.long = this.latestStatus["globalLon"];
    this.dateString = dateList.map(e => {
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
    let telemetries: Array<any> = this.droneTelemetries["droneTelemetryDTOList"];
    this.yaw = [];
    this.roll = [];
    this.pitch = [];
    this.velocityX = [];
    this.velocityY = [];
    this.velocityZ = [];

    telemetries.map(e => {
      if(e){
        this.yaw.push(e["yaw"])
        this.roll.push(e["roll"])
        this.pitch.push(e["pitch"])
        this.velocityX.push(e["velocityX"])
        this.velocityY.push(e["velocityY"])
        this.velocityZ.push(e["velocityZ"])
      }
      else{
        this.yaw.push(null)
        this.roll.push(null)
        this.pitch.push(null)
        this.velocityX.push(null)
        this.velocityY.push(null)
        this.velocityZ.push(null)
      }
    });
  let attitudeData = {
      labels: this.dateString,
      series: [
        {name: "Yaw", data: this.yaw},
        {name: "Pitch", data: this.pitch},
        {name:"Roll", data: this.roll}
      ]
  };

  this.attitudeChart.update(attitudeData);

  let velocityData: any = {
      labels: this.dateString,
      series: [
        {name: "X", data: this.velocityX},
        {name: "Y", data: this.velocityY},
        {name:"Z", data: this.velocityZ}
      ]
  };
  this.velocityChart.update(velocityData);

  });
}
stopPoll(){
  this.poll.unsubscribe();
}

ngOnInit() {

  this.route.params.subscribe(params => {
    this.droneId = params["id"];
  })

  this.droneDetailsService.getDrone(this.droneId).subscribe(res => {
    this.drone = res;
    if(this.drone['ipAddress']){
      this.hasConfigFile = true;
    }
  })

  const dataAttitude: any = {
    labels: this.dateString,
    series: [
      {name: "Yaw", data: this.yaw},
      {name: "Pitch", data: this.pitch},
      {name:"Roll", data: this.roll}
    ]
};

    var optionsAttitude: any = {
    lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0,
        fillHoles: true,
    }),
    chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    plugins:[
      tooltip(),
      // zoom(),
      // legend(),
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

    this.attitudeChart = new Chartist.Line('#attitudeChart', dataAttitude, optionsAttitude);

    this.startAnimationForBarChart(this.attitudeChart);


    const dataVelocity: any = {
      labels: this.dateString,
      series: [
        {name: "X", data: this.velocityX},
        {name: "Y", data: this.velocityY},
        {name:"Z", data: this.velocityZ}
      ]
  };
  
  
      
  
  
      this.velocityChart = new Chartist.Line('#velocityChart', dataVelocity, optionsAttitude);
  
      this.startAnimationForBarChart(this.velocityChart);



    this.startPoll();
  

  

  


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
  videoStream(){
    this.router.navigate(["drone", this.droneId, "video-stream"])
  }

  takeOff(){
    this.droneDetailsService.takeOff(this.droneId, {"altitude": 100}).subscribe();
  }

  landing(){
    this.droneDetailsService.landing(this.droneId, {}).subscribe();
  }

  downloadFile(){
    this.droneDetailsService.downloadFile(this.droneId).subscribe(
      res => {
        let filename = "vpn.conf"
        let dataType = res.type;
        let binaryData = [];
        binaryData.push(res);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    );
  }

  downloadInstallationScript(){
    this.droneDetailsService.downloadInstallationScript().subscribe(
      res =>{
        let filename = "installation.tar.gz"
        let dataType = res.type;
        let binaryData = [];
        binaryData.push(res);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
        if (filename)
            downloadLink.setAttribute('download', filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      }
    )
  }

  tutorial(){
    
  }

  
  

}
