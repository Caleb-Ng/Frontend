import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../shared/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.buildForm();
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
    this.authService.register(register).subscribe(
      res => {
        this.router.navigate(['register','success'])
      },
      err => {
        
      }
    )
  }



}
