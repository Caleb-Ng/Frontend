import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-drone',
  templateUrl: './create-drone.component.html',
  styleUrls: ['./create-drone.component.scss']
})
export class CreateDroneComponent implements OnInit {

  createDroneForm: FormGroup;
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createDroneForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    })
  }

}
