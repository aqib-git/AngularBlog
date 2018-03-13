import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MediaService } from '../../services/media.service';
import { environment } from "../../../environments/environment";
import { PostService } from '../../services/post.service';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  posting: boolean;
  showValidationErrors: boolean;
  validExtension: boolean;
  mediaSize: number = 5; // MB
  mediaExtensions: string[] = ['image/png', 'image/x-png', 'image/gif' , 'image/jpeg' , 'video/mp4' , 'video/ogg', 'video/webm'];
  mediaUrl: string;
  errorMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _mediaService: MediaService,
    private _postService: PostService,
    private _accountService: AccountService,
    private _router: Router
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.postForm = this._fb.group({
      'title': ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/i)]],
      'description': ['', Validators.required],
      'mediaId': ['', Validators.required],
      'show': [true],
      'userId': ['', Validators.required]
    });
  }

  savePost() {
    this.showValidationErrors = true;
    console.log(this._accountService.user());
    this.postForm.get('userId').setValue(this._accountService.user().id);
    if(!this.postForm.valid) {
      return;
    }
    this.posting = true;
    this.errorMessage = '';
    this._postService.createPost(this.postForm.value)
      .subscribe((post) => {
        this._router.navigate(['/posts']);
        this.posting = false;
      }, (error) => {
        this.posting = false;
        this.errorMessage = "Unable to create post, please try again."
      });
  }

  mediaChange(event) {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    let media = event.target.files[0];
    this.validExtension = this.mediaExtensions.findIndex((x) => x === media.type) >= 0
    if (!this.validExtension) {
      return;
    }

    let formData = new FormData()
    formData.append('media', media)
    this._mediaService.upload(formData)
      .subscribe((media) => {
        this.mediaUrl = environment.apiOrigin + media.uri;
        this.mediaId.setValue(media.id);
      })
  }

  get title() {
    return this.postForm.get('title');
  }

  get description() {
    return this.postForm.get('description');
  }

  get mediaId() {
    return this.postForm.get('mediaId');
  }
}
