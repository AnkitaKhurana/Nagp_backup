import { TestBed } from '@angular/core/testing';

import { StatesService } from './states.service';
import { ApiService } from '../shared/services/api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';

describe('StatesService', () => {
  let service: StatesService;
  let apiService: ApiService;
  let fakeData = { Somthing: 'something' };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(StatesService);
    apiService = TestBed.inject(ApiService);
    spyOn(Observable.prototype, 'pipe').and.callFake(function () {
      return of(fakeData);
    });
    spyOn(apiService, 'get').and.callFake(function () {
      return new Observable();
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getStates() should return states', () => {
    service.getStates().subscribe((data) => {
      expect(data).toEqual(fakeData);
    });
  });
  
});
