import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { AccountService } from '../shared/accounts.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    ) 
    { 

    }

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.loginService.loggedIn = true;
      }
    });
  }

  login(): void {
    this.router.navigate(['/payment']);
  }

  goToSuccessLogInPage(){
    this.router.navigate(['/logInSuccess']);
  }

}
