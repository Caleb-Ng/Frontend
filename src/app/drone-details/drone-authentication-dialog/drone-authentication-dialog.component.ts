import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DroneDetailsService } from '../drone-details.service';

@Component({
  selector: 'app-drone-authentication-dialog',
  templateUrl: './drone-authentication-dialog.component.html',
  styleUrls: ['./drone-authentication-dialog.component.scss']
})
export class DroneAuthenticationDialogComponent implements OnInit {

  loginForm: FormGroup;
  droneId;
  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<DroneAuthenticationDialogComponent>,
    private droneDetailsService: DroneDetailsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.droneId = this.data.droneId;
    this.buildLoginForm();
  }

  buildLoginForm(){
    console.log("building Form")
    this.loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      rememberMe: [false],
    });
  }

  login(){
    let body = this.loginForm.value;
    body['droneId'] = this.droneId
    this.droneDetailsService.loginDrone(body).subscribe(res => {
      this.dialogRef.close({
        username: body["username"],
        password: body["password"],
        success: true,
    })
    }, 
    err =>{
      this.snackBar.open("Invalid Username/Password", "OK")     
    })
  }

  close(){
    this.dialogRef.close({
      success: false,
  })
  }

}
