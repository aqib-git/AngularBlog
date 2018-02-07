import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Post } from '../post';
import { User } from '../user';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: Post[] = [];
  public users: User[] = [];
  public q: string = '';

  constructor(
    private postService: PostService, 
    private userService: UserService
  ) { }

  ngOnInit() {  
    this.userService
      .getUsers()
      .subscribe(users => this.users = users);

    this.postService
      .getPosts()
      .subscribe((posts) => { 
        this.posts = [];
        for (let post of posts) {
          this.posts.push(Object.assign(new Post(), post));
        }
    });
  }

  user(id: number) {
    for (let user of this.users) {
      if (user.id === id) 
        return user;
    }
    return {};
  }

  search() {
    for (let post of this.posts) {
      if(post.title.search(this.q) === -1) {
        post['show'] = false;
      } else {
        post['show'] = true;
      }
    }
  }
}
