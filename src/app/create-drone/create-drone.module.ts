import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateDroneComponent } from './create-drone.component';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';

import { ReactiveFormsModule,FormsModule } from '@angular/forms';

const routes = [
  {
    path: "",
    component: CreateDroneComponent
  },
];


@NgModule({
  declarations: [
    CreateDroneComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatStepperModule,
  ]
})
export class CreateDroneModule { }
