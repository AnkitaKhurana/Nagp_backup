import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://api.covid19india.org';

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    return throwError(error);
  }

  /// **********************************************************************
  //          Service to GET all request in the application
  /// **********************************************************************
  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { params: params }).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    );
  }

  /// **********************************************************************
  //          Service to POST all request in the application
  /// **********************************************************************
  post(path: string, body: Object = {}): Observable<any> {
    return this.http
      .post(`${this.apiUrl}${path}`, JSON.stringify(body), {
        headers: this.setHeaders(),
      })
      .pipe(
        map((res: Response) => res),
        catchError(this.formatErrors)
      );
  }

}
