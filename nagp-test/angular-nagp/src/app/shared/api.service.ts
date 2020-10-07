import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  private apiUrl = 'api';

  get(path, params): Observable<any>{
    return this.http.get(`${this.apiUrl}${path}`, { params: params }).pipe( 
      map((res: Response) => res),
      catchError((err)=> throwError(err))
  );
  }

  post(path,params): Observable<any>{
    return this.http.post(`${this.apiUrl}${path}`, { params: params }).pipe( 
      map((res: Response) => res),
      catchError((err)=> throwError(err))
  );
  }

  put(path,params): Observable<any>{
    return this.http.put(`${this.apiUrl}${path}`, { params: params }).pipe( 
      map((res: Response) => res),
      catchError((err)=> throwError(err))
  );
  }
}
