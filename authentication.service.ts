import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment'
import { map } from "rxjs/operators";
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private endpoint = environment.endpoint;
  jwtTokenKey = "JWT_TOKEN";
  userDetailsKey = "USER_DETAILS";
  emailKey = "LOGGED_EMAIL";
  isAuthenticated = false;
  authenticationSubject:Subject<boolean>;
  constructor(private http: HttpClient,
    private translateService: TranslateService) { 
    this.authenticationSubject = new Subject<boolean>();
  }

  
  auth(email, password): Observable<any> {
    return this.http
       .post(this.endpoint + "/authenticate", {
          username: email,
          password,
       })
       .pipe(
          map((res: any) => {
            window.localStorage.setItem(this.jwtTokenKey, res.id_token);
             this.getAuth().subscribe();
             this.getCurrentLogin().subscribe(res => {
               this.translateService.use(res.langKey);
             })
          })
       );
  }

  logout() {
    window.localStorage.removeItem(this.jwtTokenKey);
    window.localStorage.removeItem(this.userDetailsKey);
    window.localStorage.removeItem(this.emailKey);
    this.setIsAuthenticated(false);
  }

  getAuth(): Observable<any> {
    return this.http.get(this.endpoint + "/authenticate").pipe(
      map((res: any) => {
          if (res) {
            if(res.auth_email != null){
              window.localStorage.setItem(this.emailKey, res.auth_email);
              this.setIsAuthenticated(true);
            }
            else {
              this.setIsAuthenticated(false);
              window.localStorage.removeItem(this.jwtTokenKey);
              window.localStorage.removeItem(this.userDetailsKey);
              window.localStorage.removeItem(this.emailKey);
            }
            
          } else {
            this.setIsAuthenticated(false);
            window.localStorage.removeItem(this.jwtTokenKey);
            window.localStorage.removeItem(this.userDetailsKey);
            window.localStorage.removeItem(this.emailKey);
          }
          return res;
      })
    );
  }

  register(body):Observable<any>{
    return this.http.post(`${this.endpoint}/register`, body);
  }

  activateAccount(key):Observable<any>{
    let param: HttpParams = new HttpParams();
    param = param.append("key", key)
    return this.http.get(`${this.endpoint}/activate`, {params: param});
  }

  getCurrentLogin(): Observable<any>{
    return this.http.get(this.endpoint + "/account");
  }

  setIsAuthenticated(value){
    this.isAuthenticated = value;
    this.authenticationSubject.next(value);
  }

}
