import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';
import { Subscription } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private snackBar: MatSnackBar,
  ) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  
  defaultImage="https://media.wired.com/photos/59264bb5f3e2356fd8008c6e/master/pass/DroneHP_GettyImages-599365398.jpg";
  drones = [];
  totalCount = 0;
  pageSize = 8;
  currentPage = 0;

  subscription: Subscription;

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
      this.stopPolling()
      this.loadData();
    });
    
  }

  editDrone(droneId){
    this.router.navigate(['create-drone'], { queryParams: { edit:  droneId} });
  }
  
  ngOnInit() {
    this.loadData();
    
  }

  loadData(){
    let req = {
      page: this.currentPage,
      size: this.pageSize
    }
    this.subscription = this.dashboardService.getDrone(req).subscribe(res => {
      this.drones = res.body;
      this.totalCount = res.headers.get("X-Total-Count")
    }, err => {
      if(err.error.title == "Unauthorized"){
        this.snackBar.open("Please log in first!", "OK")
        this.router.navigate(["home"]);
      }
    });
  }
  stopPolling(){
    this.subscription.unsubscribe();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.stopPolling()
    this.loadData();
  }

  

}
