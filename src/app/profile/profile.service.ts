import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private providerEndpoint = environment.providerEndpoint;

  constructor(private http: HttpClient) { }

  getProfile():Observable<any>{
    return this.http.get(`${this.providerEndpoint}/account`);
  }

  editProfile(body):Observable<any>{
    return this.http.post(`${this.providerEndpoint}/account`, body);
  }

}
