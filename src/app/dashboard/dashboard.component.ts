import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
  ) { }
  
  drones = [];

  createDrone(){
    console.log("creating drone");
    this.router.navigate(["create-drone"]);
  }

  droneDetail(id){
    this.router.navigate(['drone', id]);
  }
  
  ngOnInit() {
    this.dashboardService.getDrone().subscribe(res => {
      this.drones = res.body;
      for(let drone of this.drones){
        console.log(drone);
        if(drone["lastHeartbeatTime"] == null){
          drone["online"] = false;
        }
      }
    });
    
  }

}
