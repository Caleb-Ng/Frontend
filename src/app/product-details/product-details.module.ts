import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AngularMaterialModule} from '../shared/AngularMaterial.module';
import { FlexLayoutModule } from '@angular/flex-layout';

//import { SharedModule } from 'app/shared/shared.module';
//import { HOME_ROUTE } from './home.route';
import { ProductDetailsComponent } from './product-details.component';


const routes = [
  {
    path: "",
    component: ProductDetailsComponent
  }




];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    AngularMaterialModule,
    FlexLayoutModule
  
  ],
  declarations: [ProductDetailsComponent],
})
export class ProductDetailsModule {}
