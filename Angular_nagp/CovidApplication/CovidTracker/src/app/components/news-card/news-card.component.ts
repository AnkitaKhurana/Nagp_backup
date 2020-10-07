import { Component, OnInit, Input } from '@angular/core';
import INews from 'src/app/shared/models/INews';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css']
})
export class NewsCardComponent implements OnInit {

  @Input() news: INews;
  constructor() { }

  ngOnInit(): void {
  }

}
