import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreateDroneService {

  providerEndpoint = environment.providerEndpoint;

  constructor(private http: HttpClient) { }

  createDrone(drone: any): Observable<any>{
    return this.http.post(`${this.providerEndpoint}/drone`, drone)
  }

  getDrone(droneId): Observable<any>{
    return this.http.get(`${this.providerEndpoint}/drone/${droneId}`);
  }

  editDrone(drone: any): Observable<any>{
    return this.http.put(`${this.providerEndpoint}/drone`, drone);
  }
}
