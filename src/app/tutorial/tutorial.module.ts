import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: "",
    component: TutorialComponent
  }
];


@NgModule({
  declarations: [
    TutorialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TutorialModule { }
