import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { HttpClient, HttpParams } from '@angular/common/http';
import { interval, Observable, timer } from 'rxjs';
import { map, scan, switchMap, switchMapTo, takeWhile, tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class DroneDetailsService {


    constructor(private http: HttpClient){
      
    }

   getTelemetry(droneId, range): Observable<any> {
    let httpParams: HttpParams = new HttpParams().set('range', range)
     return timer(0, 5000).pipe(
      switchMap(_ => this.http.get("/droneUserApi/droneTelemetry/" + droneId,{
        params: httpParams})),
      
    )
  }

  getVideoStream(droneId): Observable<any>{
    return this.http.get("/droneUserApi/droneVideoStream/" + droneId, {responseType: "text"})
  }

  takeOff(droneId, body?): Observable<any>{
    return this.http.post("/droneUserApi/take-off/" + droneId, body );
  }

  landing(droneId, body?): Observable<any>{
    return this.http.post("/droneUserApi/land/" + droneId, body );
  }

  downloadFile(droneId): Observable<any>{
    return this.http.get("/droneUserApi/configuration-file/" + droneId, {responseType: "text"} );
  }

  downloadInstallationScript(): Observable<any>{
    return this.http.get("/droneUserApi/installation-script" , {responseType: "blob"} );
  }
 
  
}
