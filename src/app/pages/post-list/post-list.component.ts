import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { UserService } from '../../services/user.service';
import { PostViewModel } from '../../models/post-model';
import { User } from '../../models/user-model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ApiResponseList } from '../../models/api-models';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: PostViewModel[] = [];
  public loading: boolean = true;
  public apiOrigin: string;
  public currentPage: number = 1;
  public isLastPage: boolean;

  constructor(
    private _postService: PostService
  ) {
    this.apiOrigin = environment.apiOrigin
  }

  ngOnInit() {
   this.fetchPosts(this.currentPage);
  }

  fetchPosts (page) {
    this.loading = true;
    this._postService
      .getPosts(page)
      .subscribe((response) => {
        for (let post of response.data) {
          this.posts.push(Object.assign(new PostViewModel(), post));
        }
        this.loading = false;
        this.isLastPage = response.pagination.currentPage === response.pagination.totalPages
        this.currentPage++;
      }, (error) => {
        this.loading = false;
      });
  }

  loadMore() {
    this.fetchPosts(this.currentPage);
  }
}
