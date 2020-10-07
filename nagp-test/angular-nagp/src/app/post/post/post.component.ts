import { Component, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(private router : Router) { }
  @Input() post ;
  ngOnInit(): void {
  }
  edit(){
    this.router.navigateByUrl('post/edit/'+this.post.id)
  }

}
