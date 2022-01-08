import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDrone(req?): Observable<any>{
    let params = new HttpParams();
        if (req) {
            params = params.append('page', req.page);
            params = params.append('size', req.size);
            if (req.sort) {
                params = params.append('sort', req.sort);
            }

        }

        return this.http.get('droneUserApi/drone', {params, observe: "response"});
  }
}
