import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authService: AuthService;
  let authentic: boolean = true;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    authService = TestBed.inject(AuthService);
    spyOn(authService, 'isAuthenticated').and.callFake(function () {
      return authentic;
    });
    spyOn(authService, 'logout').and.callFake(function () {
      return true;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isLoggedIn() should return true for authentic login', () => {
    authentic = true;
    expect(component.isLoggedIn()).toEqual(true);
  });

  it('isLoggedIn() should return false for non authentic login', () => {
    authentic = false;
    expect(component.isLoggedIn()).toEqual(false);
  });

  it('logout() should call the authService logout function', ()=>{
      component.logout();
      expect(authService.logout).toHaveBeenCalled();
  });
});
