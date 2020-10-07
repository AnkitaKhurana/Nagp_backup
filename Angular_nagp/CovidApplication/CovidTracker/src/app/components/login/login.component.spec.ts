import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let isAuthenicated : boolean = true;
  let router: Router;
  let dummyUser = {email:'sample', password: 'sample'};
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[FormBuilder],
      imports:[RouterTestingModule ]
    })
    .compileComponents();
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'login').and.callFake(function(){
      return isAuthenicated;
    });
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.callFake(function (url) {
      return new Promise<boolean>((resolve, reject) => {});
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login() should redirect to admin page on correct credentials', () => {
    isAuthenicated = true;
    component.login(dummyUser);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });

  it('login() should not redirect to admin page on incorrect credentials', () => {
    isAuthenicated = false;
    component.login(dummyUser);
    expect(router.navigateByUrl).toHaveBeenCalledTimes(0);
  });

});
