import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FluxComponent } from './components/flux/flux.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';

import { HomeComponent } from './pages/home.component';
import { SharedModule } from '../shared/components/shared.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommentComponent } from './components/comment/comment.component';

@NgModule({
  declarations: [
    HomeComponent,
    FluxComponent,
    HighlightComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    PostPageComponent,
    CommentComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
