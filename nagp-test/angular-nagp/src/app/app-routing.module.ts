import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayPostComponent } from './post/display-post/display-post.component';
import { AddPostComponent } from './post/add-post/add-post.component';
import { EditPostComponent } from './post/edit-post/edit-post.component';
import { AppComponent } from './app.component';

const routes: Routes = [{
    path : '',
    component: AppComponent,
    children:[
      {
        path : '',
        component: DisplayPostComponent
      }]
},
{
  path : 'post',
  component: AppComponent,
  children:[
    {
      path : '',
      component: DisplayPostComponent
    },
    {
      path : 'add',
      component: AddPostComponent
    },{
      path : 'edit/:id',
      component: EditPostComponent
    }]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
