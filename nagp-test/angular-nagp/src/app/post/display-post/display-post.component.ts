import { Component, OnInit } from '@angular/core';
import {PostService} from '../post.service';
@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {

  constructor(private postService : PostService) { }
  posts = []
  ngOnInit(): void {
    this.postService.getPosts().subscribe(data=>{
      this.posts = data;
    })
  }

}
