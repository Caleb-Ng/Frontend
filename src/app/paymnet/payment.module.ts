import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularMaterialModule} from '../shared/AngularMaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { SharedModule } from 'app/shared/shared.module';
//import { HOME_ROUTE } from './home.route';
import { PaymnetComponent } from './paymnet.component';
import { SuccessComponent } from './success/success.component';
import { CommonModule } from '@angular/common';


const routes = [
  {
    path: "",
    component: PaymnetComponent
  },
  {
    path: "success/:returnCode",
    component: SuccessComponent
  }

];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FlexLayoutModule
  
  ],
  declarations: [PaymnetComponent, SuccessComponent],
})
export class PaymentModule {}
