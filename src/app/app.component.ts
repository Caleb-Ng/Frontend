import { Component } from '@angular/core';
import {AuthenticationService} from './shared/authentication.service'
import {TranslateService} from '@ngx-translate/core'




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'drone';

constructor(private authentication : AuthenticationService,
            private Translate : TranslateService          
  ){
    this.Translate.setDefaultLang('en')
    this.Translate.addLangs(['en','ch'])

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


