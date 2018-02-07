import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';


import { PostService } from './post.service';
import { UserService } from './user.service';
import { PostComponent } from './post/post.component';

const appRoutes: Routes = [
  { 
    path: 'posts/:id',
    component: PostComponent 
  },
  {
    path: 'posts',
    component: PostListComponent
  },
  { path: '',
    redirectTo: '/posts',
    pathMatch: 'full',
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
    PostComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PostService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
