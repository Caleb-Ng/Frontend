import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  providerEndpoint = environment.providerEndpoint;

  constructor(private http: HttpClient) { }

  activate(key): Observable<any>{
    
    return this.http.get(`${this.providerEndpoint}/activate`, {params: {
      key: key
    }})
  }
}
