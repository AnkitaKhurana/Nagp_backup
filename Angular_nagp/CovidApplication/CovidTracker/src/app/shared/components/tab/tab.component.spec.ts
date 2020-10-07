import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabComponent } from './tab.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('TabComponent', () => {
  let component: TabComponent;
  let fixture: ComponentFixture<TabComponent>;
  let router: Router;
  let events = {
    index: 1,
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.callFake(function (url) {
      return new Promise<boolean>((resolve, reject) => {});
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changeURL() should call news via router navigation', () => {
    events.index = 1;
    component.changeURL(events);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/news');
  });
  it('changeURL() should call dashboard via router navigation', () => {
    events.index = 0;
    component.changeURL(events);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });
  it('changeURL() should call precautions via router navigation', () => {
    events.index = 2;
    component.changeURL(events);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/precautions');
  });
});
