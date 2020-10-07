import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AddNewsComponent } from './add-news.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

describe('AddNewsComponent', () => {
  let component: AddNewsComponent;
  let fixture: ComponentFixture<AddNewsComponent>;
  let router: Router;
  let newsService: NewsService;
  let dummyNews = { id: 9, title: '', description: '', summary: '', full: '' };
  let isAdded = true;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewsComponent],
      providers: [FormBuilder],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
    newsService = TestBed.inject(NewsService);
    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl').and.callFake(function (url) {
      return new Promise<boolean>((resolve, reject) => {});
    });
    spyOn(newsService, 'addNews').and.callFake(function (dummyNews) {
      return isAdded;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On correct details navigate to news page ', () => {
    isAdded = true;
    component.add(dummyNews);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/news');
  });

  it('On incorrect details navigate to admin page ', () => {
    isAdded = false;
    component.add(dummyNews);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/admin');
  });
});
