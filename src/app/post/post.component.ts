import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Post } from '../post';
import { User } from '../user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  post: Post;
  user: User;
  loading: boolean = true;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => 
      this.postService.getPost(parseInt(params.get('id')))
    ).subscribe(post => {
      this.post = post;
      this.userService
        .getUser(post.userId)
        .subscribe(user => {
          this.user = user;
          this.loading = false;
        });
    });
  }
}
