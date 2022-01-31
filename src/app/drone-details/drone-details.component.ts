import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
import { DroneAuthenticationDialogComponent } from './drone-authentication-dialog/drone-authentication-dialog.component';
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
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }
  
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
  }, err =>{
    let errorMsg = "";
    let navigateTo = "";
    if(err.error.title == "UNAUTHORIZED_USER"){
      errorMsg = "Drone not exist!"
      navigateTo = "dashboard"
    }
    else if(err.error.title == "UNAUTHORIZED"){
      errorMsg = "Please log in first!"
      navigateTo = "home"
    }
    else if (err.error.title == "INVALID_DRONE_USER"){
      errorMsg = "Invalid User"
      navigateTo = "dashboard"
    }
    else if (err.error.title == "INVALID_DRONE"){
      errorMsg = "Drone not exist!"
      navigateTo = "dashboard"
    }
    else  if(err.error.title == "Unauthorized"){
      errorMsg = "Please log in first!"
      navigateTo = "home"
    }
    this.snackBar.open(errorMsg, "OK")
    this.router.navigate([navigateTo])
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
  
}
  videoStream(){
    this.router.navigate(["drone", this.droneId, "video-stream"])
  }

  takeOff(): void {
    const dialogRef = this.dialog.open(DroneAuthenticationDialogComponent, {
      data: {droneId: this.droneId},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        let username = result.username;
        let password = result.password;
        this.droneDetailsService.takeOff(this.droneId, {altitude: 10, username: username, password: password}).subscribe(
          res => {
            this.snackBar.open("Successfully take off!", "OK");
          }
        );
      }
      
    });
  }


  landing(){
    const dialogRef = this.dialog.open(DroneAuthenticationDialogComponent, {
      data: {droneId: this.droneId},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result && result.success){
        let username = result.username;
        let password = result.password;
        this.droneDetailsService.landing(this.droneId, {username: username, password: password}).subscribe(res => {
          this.snackBar.open("Successfully landed", "OK");
        });
      }
      
    });
    
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
        let filename = "install.tar.xz"
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
    this.router.navigate(["tutorial"]);
  }

  
  

}
