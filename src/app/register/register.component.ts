import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
import {Howl, Howler} from 'howler';
import { AccountService } from '../shared/accounts.service';
import { LoginService } from './login.service';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  authorization: String;
  sound = new Howl({
    src: ['../../assets/audio/helikopter-short.mp3']
  });

  form: FormGroup;
  loginForm: FormGroup;
  authenticationError = false;


  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private loginService: LoginService,
    private accountService: AccountService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit(): void {
    this.accountService.identity().subscribe(() => {
      if (this.accountService.isAuthenticated()) {
        this.router.navigate(['']);
      }
    });
    this.route.queryParamMap.subscribe(params => {
      this.authorization = params.get("authorization")
    });
  
    
    this.buildForm();
    this.buildLoginForm();
    Howler.volume(0.25);
  }

  buildForm(){
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    })
    this.form.get("confirmPassword").setValidators([Validators.required, this.validateAreEqual.bind(this)]);
    this.form.get("confirmPassword").updateValueAndValidity();
  }

  buildLoginForm(){
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false],
    });
  }

  private validateAreEqual(fieldControl: FormControl) {
    return fieldControl.value === this.form.get("password").value ? null : {
        NotEqual: true
    };
  }

  register(){
    const register = this.form.value;
    delete register.confirmPassword;
    register.login = register.username;
    delete register.username;
    if(this.authorization == "provider"){
      this.authService.registerProvider(register).subscribe(
        res => {
          this.router.navigate(['register','success'])
        },
        err => {
          
        }
      )
    }
    this.authService.register(register).subscribe(
      res => {
        this.router.navigate(['register','success'])
      },
      err => {
        
      }
    )
  }

  login(): void {
    console.log(this.loginForm.get('username')!.value);
    this.loginService
      .login({
        username: this.loginForm.get('username')!.value,
        password: this.loginForm.get('password')!.value,
        rememberMe: this.loginForm.get('rememberMe')!.value,
      }, this.authorization=="provider")
      .subscribe(
        () => {
          this.authenticationError = false;
          if (!this.router.getCurrentNavigation()) {
            this.loginService.setLoggedIn(true)
            if(this.authorization == "provider"){
              this.router.navigate(["dashboard"]);
            }
            else{
              this.router.navigate(['/logInSuccess']);
            }
            
          }
        },
        () => {
          this.authenticationError = true;
          
        }
      );
  }

  



}
