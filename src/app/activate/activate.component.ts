import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../register/login.service';
import { AccountService } from '../shared/accounts.service';
import { ActivateService } from './activate.service';

@Component({
  selector: 'app-activate',
  templateUrl: './activate.component.html',
  styleUrls: ['./activate.component.scss']
})
export class ActivateComponent implements OnInit {
  activated: boolean;

  constructor(private loginService: LoginService,
    private accountService: AccountService,
    private router: Router,
    private activateService: ActivateService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.loginService.setLoggedIn(true);
        this.router.navigate(['']);
      }
      else{
        this.loginService.setLoggedIn(false);
        this.route.queryParamMap.subscribe(params => {
          let key = params.get('key')
          this.activateService.activate(key).subscribe(res => {
            this.activated = true;
          },
          err => {
            this.activated = false;
          })
        })
        
      }
    });
  }

  toLogin(){
    this.router.navigate(['/register'],{queryParams: {authorization: 'provider', type: 'login'}});
  }

}
