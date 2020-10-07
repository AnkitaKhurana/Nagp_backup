import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;
  let newsData = {
    id:0,
    title: 'Some title',
    description : 'Some Description',
    summary: 'Some summary',
    full: 'Some full news'
  }
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    component.news = newsData ;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expect News sent from parent component', () => {
    expect(component.news).toEqual(newsData);
  });

});
