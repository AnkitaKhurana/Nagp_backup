import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DistrictService } from './district.service';
import { ApiService } from '../shared/services/api.service';
import { Observable, of } from 'rxjs';

describe('DistrictService', () => {
  let service: DistrictService;
  let apiService: ApiService;
  let fakeData = { Somthing: 'something' };
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule] });
    service = TestBed.inject(DistrictService);
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

  it('getDistrict() should return districts', () => {
    service.getDistrict().subscribe((data) => {
      expect(data).toEqual(fakeData);
    });
  });
});
