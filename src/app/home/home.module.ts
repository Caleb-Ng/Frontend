import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularMaterialModule} from '../shared/AngularMaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { SharedModule } from 'app/shared/shared.module';
//import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';


const routes = [
  {
    path: "",
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FlexLayoutModule
  
  ],
  declarations: [HomeComponent],
})
export class HomeModule {}
