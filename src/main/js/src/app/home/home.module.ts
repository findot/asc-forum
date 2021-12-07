import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FluxComponent } from './components/flux/flux.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    FluxComponent,
    HighlightComponent,
    PostsComponent,
    PostComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule
  ]
})
export class HomeModule { }
