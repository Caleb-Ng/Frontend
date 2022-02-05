import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

import { ApplicationConfigService } from './application-config.services';
import { Login } from '../register/login.model';

import { environment } from '../../environments/environment';

type JwtToken = {
  id_token: string;
};

@Injectable({ providedIn: 'root' })
export class AuthServerProvider {

  providerEndpoint = environment.providerEndpoint;
  endpoint = environment.endpoint;

  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private applicationConfigService: ApplicationConfigService
  ) {}

  getToken(): string {
    const tokenInLocalStorage: string | null = this.$localStorage.retrieve('authenticationToken');
    const tokenInSessionStorage: string | null = this.$sessionStorage.retrieve('authenticationToken');
    return tokenInLocalStorage ?? tokenInSessionStorage ?? '';
  }

  login(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(this.applicationConfigService.getEndpointFor(`${this.endpoint}/authenticate`), credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe, false)));
  }

  loginDroneUser(credentials: Login): Observable<void> {
    return this.http
      .post<JwtToken>(this.applicationConfigService.getEndpointFor(`${this.providerEndpoint}/authenticate`), credentials)
      .pipe(map(response => this.authenticateSuccess(response, credentials.rememberMe, true)));
  }

  logout(): Observable<void> {
    return new Observable(observer => {
      this.$localStorage.clear('authenticationToken');
      this.$sessionStorage.clear('authenticationToken');
      observer.complete();
    });
  }

  private authenticateSuccess(response: JwtToken, rememberMe: boolean, isDroneUser: boolean): void {
    const jwt = response.id_token;
    if (rememberMe) {
      if(isDroneUser){
        this.$localStorage.store('authorization', "provider")
      }
      else{
        this.$localStorage.store('authorization', "normal")
      }
      this.$localStorage.store('authenticationToken', jwt);
      this.$sessionStorage.clear('authenticationToken');
      this.$sessionStorage.clear("authorization");
    } else {
      if(isDroneUser){
        this.$sessionStorage.store('authorization', "provider")
      }
      else{
        this.$sessionStorage.store('authorization', "normal")
      }
      this.$sessionStorage.store('authenticationToken', jwt);
      this.$localStorage.clear('authenticationToken');
      this.$localStorage.clear("authorization");
    }
  }
}
