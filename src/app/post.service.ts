import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostService{
  
  private origin: string

  constructor(private httpClient: HttpClient) {
    this.origin = 'https://jsonplaceholder.typicode.com';
  }

  public getPosts (): Observable<Post[]> {
    return this.httpClient.get<Post[]>(`${this.origin}/posts`);
  }

  public getPost(id: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.origin}/posts/${id}`);
  }
}
