import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'ngx-webstorage';
import { LANGUAGES } from '../shared/language.constants';
import { AccountService } from '../shared/accounts.service';
import { LoginService } from '../register/login.service';
import { ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})




export class HeaderComponent implements OnInit, OnDestroy {

  @Input('sidenav') sidenav: MatSidenav
   
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);
  inProduction?: boolean;
  isNavbarCollapsed = true;
  languages = LANGUAGES;
  openAPIEnabled?: boolean;
  version = '';

  private _mobileQueryListener: () => void;

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private sessionStorage: SessionStorageService,
    private accountService: AccountService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  loggedIn: boolean;
  ngOnInit(): void {
    this.loginService.loggedIn.subscribe(
      loggedIn => this.loggedIn = loggedIn
    )
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.loginService.setLoggedIn(true);
      }
      else{
        this.loginService.setLoggedIn(false);
      }
    });

  }

  changeLanguage(languageKey: string): void {
    this.sessionStorage.store('locale', languageKey);
    this.translateService.use(languageKey);
  }

  collapseNavbar(): void {
    this.isNavbarCollapsed = true;
  }

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(){
    this.router.navigate(['/register'],{queryParams: {authorization: 'provider', type: 'login'}});
  }

  register(): void {
    this.router.navigate(['/register'],{queryParams: {authorization: 'provider', type: 'register'}});
  }

  logout(): void {
    this.loginService.setLoggedIn(false);
    this.collapseNavbar();
    this.loginService.logout();
    this.router.navigate(['']);
  }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  viewProfile(){
    this.router.navigate(['/profile']);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  toggleSidenav(){
    this.sidenav.toggle();
  }

  goHome(){
    if(this.loggedIn){
      this.router.navigate(["dashboard"]);
    }
    else{
      this.router.navigate(["home"]);
    }
  }

}
