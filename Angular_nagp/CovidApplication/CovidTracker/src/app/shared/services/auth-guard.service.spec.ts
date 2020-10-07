import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.service';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';

@Component({ template: '' })
class TestComponent {}

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let authService: AuthService;
  let loggedIn = true;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'login', component: TestComponent },
        ]),
      ],
    });
    service = TestBed.inject(AuthGuardService);
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.callFake(function () {
      return loggedIn;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('canActivate() should return true for logged in user', () => {
    loggedIn = true;
    expect(service.canActivate()).toEqual(true);
  });
  it('canActivate() should return false  for non logged in user', () => {
    loggedIn = false;
    expect(service.canActivate()).toEqual(false);
  });
});
