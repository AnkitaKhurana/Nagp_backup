import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let store = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);

    spyOn(localStorage, 'getItem').and.callFake(function (key) {
      return store[key];
    });
    spyOn(localStorage, 'setItem').and.callFake(function (key, value) {
      return (store[key] = value + '');
    });
    spyOn(localStorage, 'clear').and.callFake(function () {
      store = {};
    });
    spyOn(localStorage, 'removeItem').and.callFake(function (key) {
      store[key] = undefined;
    });
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('isAuthenticated() should return true for token present in the localstorage', () => {
    localStorage.setItem('token', 'something');
    expect(service.isAuthenticated()).toEqual(true);
  });

  it('isAuthenticated() should return false for token not present in the localstorage', () => {
    expect(service.isAuthenticated()).toEqual(false);
  });

  it('login() should save a token for right credentials', () => {
    let admin = {
      email: 'admin@admin.com',
      password: 'admin',
    };
    let result = service.login(admin);
    expect(result).toEqual(true);
    expect(localStorage.getItem('token')).toEqual(admin.email);
  });
  it('login() should not save any token for wrong credentials', () => {
    let admin = {
      email: 'wrong@admin.com',
      password: 'admin',
    };
    let result = service.login(admin);
    expect(result).toEqual(false);
    expect(localStorage.getItem('token')).toEqual(undefined);
  });

  it('logout() should remove the token from localstorage', () => {
    localStorage.setItem('token', 'something');
    let result = service.logout();
    expect(result).toEqual(true);
    expect(localStorage.getItem('token')).toEqual(undefined);
  });
});
