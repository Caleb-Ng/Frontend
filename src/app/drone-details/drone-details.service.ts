import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { interval, Observable, timer } from 'rxjs';
import { map, scan, switchMap, switchMapTo, takeWhile, tap } from 'rxjs/operators'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DroneDetailsService {

  private providerEndpoint = environment.providerEndpoint;
  private droneEndpoint = environment.droneEndpoint;


    constructor(private http: HttpClient){
      
    }

   getTelemetry(droneId, range): Observable<any> {
    let httpParams: HttpParams = new HttpParams().set('range', range)
     return timer(0, 5000).pipe(
      switchMap(_ => this.http.get(`${this.providerEndpoint}/droneTelemetry/` + droneId,{
        params: httpParams})),
      
    )
  }

  getVideoStream(droneId): Observable<any>{
    return this.http.get(`${this.providerEndpoint}/droneVideoStream/` + droneId, {responseType: "text"})
  }

  takeOff(droneId, body?): Observable<any>{
    return this.http.post(`${this.providerEndpoint}/take-off/` + droneId, body );
  }

  landing(droneId, body?): Observable<any>{
    return this.http.post(`${this.providerEndpoint}/land/` + droneId, body );
  }

  downloadFile(droneId): Observable<any>{
    return this.http.get(`${this.providerEndpoint}/configuration-file/` + droneId, {responseType: "text"} );
  }

  downloadInstallationScript(): Observable<any>{
    return this.http.get(`${this.providerEndpoint}/installation-script` , {responseType: "blob"} );
  }

  getDrone(droneId): Observable<any>{
    return this.http.get(`${this.providerEndpoint}/drone/` + droneId);
  }
  
  loginDrone(body): Observable<any>{
    return this.http.post(`${this.droneEndpoint}/authenticateFromUI`, body);
  }
  
}
