import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroneDetailsComponent } from './drone-details.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { AgmCoreModule } from '@agm/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

const routes = [
  {
    path: "",
    component: DroneDetailsComponent
  },
];

@NgModule({
  declarations: [
    DroneDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAJ1D8We8IpPqcs1-tbjGZAP4X07DVaRTw"
    })
  ]
})
export class DroneDetailsModule { }
