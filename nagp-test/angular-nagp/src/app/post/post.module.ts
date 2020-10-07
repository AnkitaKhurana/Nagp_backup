import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { DisplayPostComponent } from './display-post/display-post.component';
import { PostComponent } from './post/post.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddPostComponent, EditPostComponent, DisplayPostComponent, PostComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [AddPostComponent, EditPostComponent, DisplayPostComponent]
}) 
export class PostModule { }
