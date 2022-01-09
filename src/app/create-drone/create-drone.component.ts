import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateDroneService } from './create-drone.service';

@Component({
  selector: 'app-create-drone',
  templateUrl: './create-drone.component.html',
  styleUrls: ['./create-drone.component.scss']
})
export class CreateDroneComponent implements OnInit {

  createDroneForm: FormGroup;
  
  constructor(private fb: FormBuilder,
    private createDroneService: CreateDroneService,
    private router: Router) { }

  ngOnInit(): void {
    this.createDroneForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
    })
  }

  createDrone(){
    let drone = this.createDroneForm.value;
    drone["login"] = drone["username"];
    delete drone["username"];
    console.log(drone);
    this.createDroneService.createDrone(drone).subscribe(res => {
    });
  }

  done(){
    this.router.navigate(["dashboard"]);
  }

}
