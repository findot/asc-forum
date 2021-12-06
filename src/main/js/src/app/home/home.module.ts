import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavComponent } from './components/navigation/nav/nav.component';
import { LogoComponent } from '../shared/components/logo/logo.component';
import { SearchboxComponent } from './components/navigation/searchbox/searchbox.component';
import { SectionsLinksComponent } from './components/navigation/sections-links/sections-links.component';
import { LoginButtonComponent } from './components/navigation/login-button/login-button.component';
import { FluxComponent } from './components/flux/flux.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostComponent } from './components/post/post.component';

import { HomeComponent } from './home.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavComponent,
    LogoComponent,
    SearchboxComponent,
    SectionsLinksComponent,
    LoginButtonComponent,
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
