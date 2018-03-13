import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';

/* Pages Components */
import { PostListComponent } from './pages/post-list/post-list.component';
import { CreatePostComponent } from './pages/create-post/create-post.component'
/* Layout Components */
import { BlogFrontComponent } from './layouts/blog-front/blog-front.component'
/* Shared Components */
import { SignupFormComponent } from './components/signup-form/signup-form.component'
import { SigninFormComponent } from './components/signin-form/signin-form.component'
import { PostFormComponent } from './components/post-form/post-form.component'
/* Services */
import { PostService } from './services/post.service';
import { MediaService } from './services/media.service';
import { UserService } from './services/user.service';
import { AccountService } from './services/account.service'
import { AuthInterceptorService } from './auth-interceptor.service'
/* Gaurds */
import { AuthGuard } from './services/auth-gaurd.service';
import { PostSingleComponent } from './pages/post-single/post-single.component';

const appRoutes: Routes = [
  {
    path: '',
    component: BlogFrontComponent,
    data: {requireAuth: false},
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        data: {requireAuth: false},
        canActivateChild: [AuthGuard],
        children: [
          { path: '', component: PostListComponent, data: {requireAuth: false} },
          { path: 'posts', component: PostListComponent, data: {requireAuth: false} },
          { path: 'posts/create', component: CreatePostComponent, data: {requireAuth: true} },
          { path: 'posts/:id', component: PostSingleComponent, data: {requireAuth: false} }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    BlogFrontComponent,
    SignupFormComponent,
    SigninFormComponent,
    PostFormComponent,
    CreatePostComponent,
    PostSingleComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule.withServerTransition({ appId: 'app' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostService,
    UserService,
    AccountService,
    MediaService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
