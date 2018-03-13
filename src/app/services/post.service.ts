import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post, PostViewModel } from '../models/post-model';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { ApiResponseList } from '../models/api-models';

@Injectable()
export class PostService{

  private origin: string;

  constructor(private httpClient: HttpClient) {
    this.origin = 'http://localhost:22199/api';
  }

  public getPosts (page = 1): Observable<ApiResponseList<PostViewModel>> {
    return this.httpClient.get<ApiResponseList<PostViewModel>>(`${this.origin}/posts?page=${page}`);
  }

  public getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.origin}/posts/${id}`);
  }

  public postAll(posts: Post[]): Observable<Object> {
    return this.httpClient.post(`${this.origin}/posts/all`, posts);
  }

  public createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.origin}/posts`, post);
  }
}
