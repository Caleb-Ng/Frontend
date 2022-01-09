import { Component } from '@angular/core';
import {AuthenticationService} from './shared/authentication.service'
import {TranslateService} from '@ngx-translate/core'
import { MatIconRegistry } from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drone';

constructor(private authentication : AuthenticationService,
            private Translate : TranslateService,
            private matIconRegistry:MatIconRegistry,
            private domSanitzer:DomSanitizer,    
  ){
    this.Translate.setDefaultLang('en')
    this.Translate.addLangs(['en','ch'])
    
    this.matIconRegistry.addSvgIcon(
      'drone',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/drone.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'drone_armed',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/drone_armed.svg')
    );

    this.matIconRegistry.addSvgIcon(
      'mode',
      this.domSanitzer.bypassSecurityTrustResourceUrl('assets/icons/mode.svg')
    );

}
  clicking(){
    console.log ( " send data please ")
    this.authentication.getCurrentLogin().subscribe(res => {

    },
    err => {
      console.log(err.error.title);
      
    })
  }

  
}


