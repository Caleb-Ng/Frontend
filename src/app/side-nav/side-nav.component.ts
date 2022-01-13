import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { LoginService } from '../register/login.service';
import { AccountService } from '../shared/accounts.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input('sidenav') sidenav: MatSidenav;
  constructor(private router: Router,
    private loginService: LoginService,
    private accountService: AccountService) { }

  loggedIn: boolean;
  ngOnInit(): void {
    this.loginService.loggedIn.subscribe(
      loggedIn => this.loggedIn = loggedIn
    )
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.loginService.setLoggedIn(true);
      }
      else{
        this.loginService.setLoggedIn(false);
      }
    });

  }

  goHome(){
    this.sidenav.toggle();
    if(this.loggedIn){
      this.router.navigate(["dashboard"]);
    }
    else{
      this.router.navigate(["home"]);
    }
  }

  goProfile(){
    this.sidenav.toggle();
    if(this.loggedIn){
      this.router.navigate(["profile"]);
    }
  }

  logIn(){
    this.sidenav.toggle();
    if(!this.loggedIn){
      this.router.navigate(["register"], {queryParams:{authorization: 'provider', type: "login"}});
    }
  }

}
