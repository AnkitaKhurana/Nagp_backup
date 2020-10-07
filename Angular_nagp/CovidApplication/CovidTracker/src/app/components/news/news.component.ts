import { Component, OnInit, Output } from '@angular/core';
import INews from 'src/app/shared/models/INews';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit {
  constructor(private newsService: NewsService) {
    console.log(this.news)
  }
  news: INews[];
  ngOnInit(): void {
    this.newsService.getNews().subscribe((data) => {
      this.news = data;
    });
  }
}
