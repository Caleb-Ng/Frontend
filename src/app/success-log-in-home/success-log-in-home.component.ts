import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success-log-in-home',
  templateUrl: './success-log-in-home.component.html',
  styleUrls: ['./success-log-in-home.component.scss']
})
export class SuccessLogInHomeComponent implements OnInit {

  options: FormGroup;

  constructor(fb: FormBuilder, private router: Router) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });
  }
  ngOnInit(): void {
    
  }

  view(){
    this.router.navigate(['/productdetails'])
  }

  

}
