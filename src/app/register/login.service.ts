import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { Account } from '../shared/account.model';
import { AccountService } from '../shared/accounts.service';
import { AuthServerProvider } from '../shared/auth-jwt.services';
import { Login } from './login.model';

@Injectable({ providedIn: 'root' })
export class LoginService {
  loggedIn: Observable<boolean>;
  private _loggedIn: Subject<boolean>;    // consider putting the actual type of the data you will receive

  constructor(private accountService: AccountService, private authServerProvider: AuthServerProvider) {
    this._loggedIn = new Subject<boolean>();
    this.loggedIn = this._loggedIn.asObservable();
  }
  
  login(credentials: Login, isDroneUser: boolean): Observable<Account | null> {
    if(isDroneUser){
      return this.authServerProvider.loginDroneUser(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
    }
    else{
      return this.authServerProvider.login(credentials).pipe(mergeMap(() => this.accountService.identity(true)));
    }
    
  }

  logout(): void {
    this.authServerProvider.logout().subscribe({ complete: () => this.accountService.authenticate(null) });
  }

  setLoggedIn(state: boolean){
    this._loggedIn.next(state);
  }
}
