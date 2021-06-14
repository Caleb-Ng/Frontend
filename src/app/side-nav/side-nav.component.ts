import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  routeTo(path){
    this.sidenav.toggle();
    this.router.navigate([path])
  }

}
