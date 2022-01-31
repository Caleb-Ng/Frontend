import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateDroneService } from './create-drone.service';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-drone',
  templateUrl: './create-drone.component.html',
  styleUrls: ['./create-drone.component.scss']
})
export class CreateDroneComponent implements OnInit {

  createDroneForm: FormGroup;

  defaultImage = "https://media.wired.com/photos/59264bb5f3e2356fd8008c6e/master/pass/DroneHP_GettyImages-599365398.jpg"
  image;
  isEdit = false;
  droneId;
  drone;
  constructor(private fb: FormBuilder,
    private createDroneService: CreateDroneService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.droneId = params.get("edit")
      if(this.droneId!=null){
        this.isEdit = true;
      }
      if(this.isEdit){
        this.createEditForm();
        this.getDrone();
      }
      else{
        this.createCreateForm();
      }
    });

    
  }
  getDrone(){
    this.createDroneService.getDrone(this.droneId).subscribe(res => {
      this.drone = res;
      this.createDroneForm.setValue({name: this.drone["name"]});
      this.image = this.drone['image'];
    })
  }

  createCreateForm(){
    this.createDroneForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      name: [null, [Validators.required]],
    })
  }

  createEditForm(){
    this.createDroneForm = this.fb.group({
      name: [null, [Validators.required]],
    })
  }

  createDrone(stepper: MatStepper){
    let drone = this.createDroneForm.value;
    drone["login"] = drone["username"];
    if(this.image != null){
      drone["image"] = this.image;
    }
    delete drone["username"];
    this.createDroneService.createDrone(drone).subscribe(res => {
        stepper.next();
    });
  }

  editDrone(stepper: MatStepper){
    let drone = this.createDroneForm.value;
    if(this.image != null){
      drone["image"] = this.image;
    }
    drone["id"] = this.drone['id'];
    this.createDroneService.editDrone(drone).subscribe(res => {
      stepper.next();
    },
    err =>{
      
    });
  }

  done(){
    this.router.navigate(["dashboard"]);
  }

  onChange(event) {
    // this.image = event.target.files[0];
    if(event.target.files[0].size > 500000){
      this.snackBar.open("Fize size cannot exceed 500KB", "OK");
    }
    else{
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0])
      reader.onload = (_event) => { 
        this.image = reader.result; 
      }
    }


  }

  onFileUploadClicked(){
    document.getElementById('fileInput').click();
  }


}
