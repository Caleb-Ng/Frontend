import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }

  createDrone(){
    console.log("creating drone");
    this.router.navigate(["create-drone"]);
  }

  droneDetail(){
    this.router.navigate(['drone', 1]);
  }
  ngOnInit() {
    
  }

}
