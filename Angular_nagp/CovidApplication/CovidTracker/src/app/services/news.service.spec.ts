import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { ApiService } from '../shared/services/api.service';
import { Observable, of } from 'rxjs';

describe('NewsService', () => {
  let service: NewsService;
  let apiService: ApiService;
  let fakeData = {'Somthing': 'something'};
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(NewsService);
    apiService = TestBed.inject(ApiService);
    spyOn(apiService, 'get').and.callFake(function () {
      return of(fakeData);
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getNews() should return news', () => {
      service.getNews().subscribe(data=> {
        expect(data).toEqual(fakeData);
      });
  });

});
