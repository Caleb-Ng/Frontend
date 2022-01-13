import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroneDetailsComponent } from './drone-details.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const routes = [
  {
    path: "",
    component: DroneDetailsComponent
  },
  {
    path: "video-stream",
    component: VideoStreamComponent
  },
];

@NgModule({
  declarations: [
    DroneDetailsComponent,
    VideoStreamComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAJ1D8We8IpPqcs1-tbjGZAP4X07DVaRTw"
    })
  ]
})
export class DroneDetailsModule { }
