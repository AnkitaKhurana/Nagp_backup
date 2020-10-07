import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css'],
})
export class TabComponent implements OnInit {
  constructor(private router: Router) {}
  ngOnInit(): void {}

  changeURL(event) {
    let index = event.index;
    switch (index) {
      case 0:
        this.router.navigateByUrl('/dashboard');
        break;
      case 1:
        this.router.navigateByUrl('/news');
        break;
      case 2:
        this.router.navigateByUrl('/precautions');
        break;
    }
  }
}
