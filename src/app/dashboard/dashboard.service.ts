import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private providerEndpoint = environment.providerEndpoint;

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
        return timer(0, 10000).pipe(
          switchMap(_ => this.http.get(`${this.providerEndpoint}/drone`, {params, observe: "response", responseType: 'json'})
          ) 
        )
  }

  deleteDrone(droneId): Observable<any>{
      return this.http.delete(`${this.providerEndpoint}/drone/` + droneId)
  }

}
