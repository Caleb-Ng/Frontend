import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private authJwtProvider: AuthServerProvider) { }

  streamResource = ""
  droneId;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.droneId = params["id"];
    })
    this.streamResource = "/droneUserApi/" + this.droneId + "/stream.mjpg?access_token=" + this.authJwtProvider.getToken() ;
  }


}
