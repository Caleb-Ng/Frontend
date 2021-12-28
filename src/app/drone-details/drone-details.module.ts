import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DroneDetailsComponent } from './drone-details.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


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
  ]
})
export class DroneDetailsModule { }
