import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile():Observable<any>{
    return this.http.get("/droneUserApi/account");
  }

  editProfile(body):Observable<any>{
    return this.http.post("/droneUserApi/account", body);
  }

}
