import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  form: FormGroup;
  isEditing = false;
  profile;
  constructor(private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();
    this.getProfile();
    
  }

  getProfile(){
    this.profileService.getProfile().subscribe(res => {
      this.profile = res;
      this.form.setValue({
        username: this.profile['login'],
        firstName: this.profile['firstName'],
        lastName: this.profile['lastName'],
        email: this.profile['email']
      })
    }, err => {
      if(err.error.title === "Unauthorized"){
        this.snackBar.open("Please log in first.", "OK");
        this.router.navigate(["/home"]);
      }
    })
  }

  buildForm(){
    this.form = this.fb.group({
      username: [null, [Validators.required]],
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
    })
  }

  toggleEdit(){
    if(this.isEditing){
      this.isEditing = false;
    }
    else{
      this.isEditing = true;
    }
  }

  editProfile(){
    this.profile['firstName'] = this.form.value['firstName'];
    this.profile['lastName'] = this.form.value['lastName'];
    this.profileService.editProfile(this.profile).subscribe(res => {
      this.toggleEdit();
    });
  }

}
