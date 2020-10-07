import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,private postService: PostService , private router: Router) { }
  postForm: FormGroup;
  get id() { return this.postForm.get('id'); }
  get name() { return this.postForm.get('name'); }
  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      id: [''],
      name : ['' , Validators.required]
    })
  }
  add(data: any) {
    this.postService.addPost(data).subscribe(data=>{console.log(data);
    
    this.router.navigateByUrl('/post')
    })
  }

}
