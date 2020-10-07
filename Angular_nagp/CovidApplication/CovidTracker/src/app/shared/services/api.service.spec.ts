import { TestBed, getTestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let injector: TestBed;
  let httpMock: HttpTestingController;

  const dummyUserListResponse = {
    data: [],
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get() should return data', () => {
    service.get('').subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });
    const req = httpMock.expectOne('https://api.covid19india.org');
    expect(req.request.method).toBe('GET');
    req.flush(dummyUserListResponse);
  });

  it('post() should save data', () => {
    service.post('', { dummyUserListResponse }).subscribe((res) => {
      expect(res).toEqual(dummyUserListResponse);
    });
    const req = httpMock.expectOne('https://api.covid19india.org');
    expect(req.request.method).toBe('POST');
    req.flush(dummyUserListResponse);
  });

});
