import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularMaterialModule} from '../shared/AngularMaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { SharedModule } from 'app/shared/shared.module';
//import { HOME_ROUTE } from './home.route';
//import { HomeComponent } from './home.component';
import { SuccessLogInHomeComponent } from './success-log-in-home.component';

const routes = [
  {
    path: "",
    component: SuccessLogInHomeComponent
  }




];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule
  
  ],
  declarations: [SuccessLogInHomeComponent],
})
export class SuccessLogInHomeModule {}
