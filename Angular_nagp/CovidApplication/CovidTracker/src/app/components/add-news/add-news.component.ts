import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import INews from 'src/app/shared/models/INews';
import { NewsService } from 'src/app/services/news.service';
import { MemoryService } from '../../shared/services/memory.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.css'],
  providers: [MemoryService, HttpClientInMemoryWebApiModule],
})
export class AddNewsComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private newsService: NewsService,
    private router: Router
  ) {}
  newsForm: FormGroup;
  get id() { return this.newsForm.get('id'); }
  get title() { return this.newsForm.get('title'); }
  get summary() { return this.newsForm.get('summary'); }
  get description() { return this.newsForm.get('description'); }
  get full() { return this.newsForm.get('full'); }
  get image() { return this.newsForm.get('image'); }

  ngOnInit(): void {
    this.newsForm = this.formBuilder.group({
      id: ['', [Validators.required,  Validators.pattern("^[0-9]*$")]],
      title: ['', Validators.required],
      summary: ['', Validators.required],
      description: ['', Validators.required],
      full: ['', Validators.required],
      image: [''],
    });
  }

  add(news: INews) {
    if (this.newsService.addNews(news)) {
      this.router.navigateByUrl('/news');
    } else {
      this.router.navigateByUrl('/admin');
    }
  }
}
