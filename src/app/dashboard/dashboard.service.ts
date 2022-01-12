import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
        return timer(0, 10000).pipe(
          switchMap(_ => this.http.get('droneUserApi/drone', {params, observe: "response", responseType: 'json'})
          ) 
        )
  }

  deleteDrone(droneId): Observable<any>{
      return this.http.delete('droneUserApi/drone/' + droneId)
  }

}
