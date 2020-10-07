import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatesComponent } from './states.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StatesComponent', () => {
  let component: StatesComponent;
  let fixture: ComponentFixture<StatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatesComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
