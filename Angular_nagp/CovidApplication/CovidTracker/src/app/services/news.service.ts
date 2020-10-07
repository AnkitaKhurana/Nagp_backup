import { Injectable } from '@angular/core';
import INews from '../shared/models/INews';
import { ApiService } from '../shared/services/api.service';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private apiService: ApiService, private http: HttpClient) {}
  private formatErrors(error: any) {
    return throwError(error);
  }
  getNews() {
    return this.apiService.get('/api/news');
  }
  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(`${path}`, JSON.stringify(body)).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    );
  }

  addNews(news: INews): boolean {
    this.post('/api/news/4', news).subscribe((data) => {return true;});
    return true;    
  }
}
