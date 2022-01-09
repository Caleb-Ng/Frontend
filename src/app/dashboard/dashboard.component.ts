import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  totalCount = 0;
  pageSize = 8;
  currentPage = 0;

  createDrone(){
    console.log("creating drone");
    this.router.navigate(["create-drone"]);
  }

  droneDetail(id){
    this.router.navigate(['drone', id]);
  }

  deleteDrone(id){
    console.log(id);
    this.dashboardService.deleteDrone(id).subscribe(res => {
      console.log("completed");
      this.loadData();
    });
    
  }

  editDrone(id){
    console.log(id);
  }
  
  ngOnInit() {
    this.loadData();
    
  }

  loadData(){
    let req = {
      page: this.currentPage,
      size: this.pageSize
    }
    this.dashboardService.getDrone(req).subscribe(res => {
      this.drones = res.body;
      this.totalCount = res.headers.get("X-Total-Count")
    });
  }

  pageChanged(event: PageEvent) {
    console.log({ event });
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

}
