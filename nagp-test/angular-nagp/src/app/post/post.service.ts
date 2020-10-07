import { Injectable } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  editPost(data: any) {
    return this.api.put('/posts/'+data.id, data);
  }
  getPost(id: string) {
    return this.api.get('/posts/'+id,{});
  }

  constructor(private api: ApiService) { }
  getPosts(){
    return this.api.get('/posts',{});
  }

  addPost(data){
    return this.api.post('/posts',data);
  }
}
