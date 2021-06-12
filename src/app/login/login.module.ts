import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
//mport { FormBuilderModule } from 'angular-form-builder';

const routes = [
    {
      path: "",
      component: LoginComponent
    }
  
  
  
  
  ];

@NgModule({
  imports: [ 
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    //FormBuilderModule
  
  
  ],
  declarations: [LoginComponent],
})
export class LoginModule {}
