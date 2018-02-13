import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Post } from '../post';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  public posts: Post[] = [];
  public users: User[] = [];
  public searchedPosts: Post[] = [];
  public loading: boolean = true;
  public q: string = '';
  public postForm: FormGroup;
  public postFormSubmitted: boolean = false;

  constructor(
    private postService: PostService, 
    private userService: UserService,
    private fb: FormBuilder
  ) { 
    this.createPostForm();
  }

  ngOnInit() {  
    this.fetchUsers();
  }

  fetchUsers () {
    this.userService
      .getUsers()
      .subscribe(users => {
        this.users = users;
        this.fetchPosts();
      });
  }

  fetchPosts () {
    this.postService
      .getPosts()
      .subscribe((posts) => { 
        this.posts = [];
        for (let post of posts) {
          this.posts.push(Object.assign(new Post(), post));
        }
        this.loading = false;
    });
  }

  user(id: any) {
    for (let user of this.users) {
      if (user.id === id) 
        return user;
    }
    return {};
  }

  searchedPostsCount () : number{
    if(this.isSearchEmpty) {
      return 1;
    }
    let counter = 0;
    for (let post of this.posts) {
      if(post.show && post.title.search(this.q) > -1) {
        counter++;
      }
    }
    return counter;
  }

  get isSearchEmpty (): boolean {
    if(!this.q || this.q.trim() === '') {
      return true;
    }
    return false;
  }

  createPostForm () {
    this.postForm = this.fb.group({
      postItems: this.fb.array([])
    });
  }

  addPostItem () {
    this.postItems.push(this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    }));
  }

  removePostItem(index) {
    this.postItems.removeAt(index);
  }

  get postItems () { return this.postForm.get('postItems') as FormArray; }

  submitPosts () {
    this.postFormSubmitted = true;
    this.postService.postAll(this.postForm.value.postItems).subscribe(data => this.clearFormArray(this.postItems));
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

}
