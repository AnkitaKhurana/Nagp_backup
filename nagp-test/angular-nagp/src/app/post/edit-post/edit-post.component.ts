import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,private postService: PostService , private arouter: ActivatedRoute, private router : Router) { }
  postForm: FormGroup;
  get id() { return this.postForm.get('id'); }
  get name() { return this.postForm.get('name'); }
  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      id: [''],
      name : [ '', Validators.required]
    });   
    this.arouter.paramMap.subscribe(async data=>{
       let id = data.get('id');
       let content = await  this.postService.getPost(id).toPromise();
       this.postForm = this.formBuilder.group({
        id: [id],
        name : [ content.name, Validators.required]
      });   
    });   
  
  }
  edit(data){    
    this.postService.editPost(data).subscribe(data=>console.log(data));
    this.router.navigateByUrl('/');
  }

  
}
