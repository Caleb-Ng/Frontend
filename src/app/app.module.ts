import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {TranslateModule,TranslateLoader} from '@ngx-translate/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component'
import {AngularMaterialModule} from './shared/AngularMaterial.module';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { SideNavComponent } from './side-nav/side-nav.component';
//import { ProductDetailsComponent } from './product-details/product-details.component';
//import { FormBuilderModule } from 'angular-form-builder';
//import { PaymnetComponent } from './paymnet/paymnet.component';


export function HttpLoaderFactor(http: HttpClient){
  return new TranslateHttpLoader(http, 'assets/i18n/','.json')
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SideNavComponent,
    //ProductDetailsComponent,
    //PaymnetComponent,
    //LoginComponent,
    //HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    //FormBuilderModule,
    NgxWebstorageModule.forRoot(),
    TranslateModule.forRoot({
      loader:{
        provide : TranslateLoader,
        useFactory : (HttpLoaderFactor),
        deps : [HttpClient]
      }
    }),
    BrowserAnimationsModule,

  ],
  providers: [
    
    {provide: HTTP_INTERCEPTORS,
    useClass: JwtInterceptor,
    multi: true}
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
