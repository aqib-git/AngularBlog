import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router  } from '@angular/router';
import { ApiResponse } from '../../models/api-models';
import { environment } from '../../../environments/environment';
import { PostService } from '../../services/post.service';
import { PostViewModel } from '../../models/post-model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {

  public apiOrigin: string;
  public loading: boolean;
  public post: PostViewModel;

  constructor(private _route: ActivatedRoute, private _postService: PostService, private _router: Router) {
    this.apiOrigin = environment.apiOrigin
  }

  ngOnInit() {
    this.fetchPost();
  }

  fetchPost() {
    this.loading = true;
    let p = this._route.paramMap
    .switchMap((params: ParamMap) =>
      this._postService.getPost(params.get('id'))
    );
    p.subscribe((response) => {
      this.loading = false;
      this.post = response.data
    }, (error) => {
      this.loading = false;
      this._router.navigate(['/'])
    });
  }
}
