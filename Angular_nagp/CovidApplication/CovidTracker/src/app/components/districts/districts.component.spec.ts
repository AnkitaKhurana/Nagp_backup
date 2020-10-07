import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictsComponent } from './districts.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { from  } from 'rxjs';

describe('DistrictsComponent', () => {
  let component: DistrictsComponent;
  let fixture: ComponentFixture<DistrictsComponent>;
  let actRoute : ActivatedRoute;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictsComponent ],
      imports:[HttpClientTestingModule, RouterModule.forRoot([])],
      providers:[{ActivatedRoute, useValue: { 'params': from([{ 'id': 1 }]) }} ]
    })
    .compileComponents();
    actRoute = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
