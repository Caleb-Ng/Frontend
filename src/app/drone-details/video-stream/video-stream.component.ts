import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../register/login.service';
import { AccountService } from '../../shared/accounts.service';
import { AuthServerProvider } from '../../shared/auth-jwt.services';
import { DroneDetailsService } from '../drone-details.service';

@Component({
  selector: 'app-video-stream',
  templateUrl: './video-stream.component.html',
  styleUrls: ['./video-stream.component.scss']
})
export class VideoStreamComponent implements OnInit {
  
  constructor(private droneDetailsService: DroneDetailsService,
    private route: ActivatedRoute,
    private authJwtProvider: AuthServerProvider,
    private loginService: LoginService,
    private accountService: AccountService,
    private router: Router) { }

  streamResource = ""
  droneId;
  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (!this.accountService.isAuthenticated()) {
        this.loginService.setLoggedIn(true);
        this.router.navigate(["/home"]);
      }
    });

    this.route.params.subscribe(params => {
      this.droneId = params["id"];
    })
    this.streamResource = "/droneUserApi/" + this.droneId + "/stream.mjpg?access_token=" + this.authJwtProvider.getToken() ;
  }


}
