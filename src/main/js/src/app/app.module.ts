import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './navigation/nav/nav.component';
import { LogoComponent } from './logo/logo.component';
import { SearchboxComponent } from './navigation/searchbox/searchbox.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SectionsLinksComponent } from './navigation/sections-links/sections-links.component';
import { LoginButtonComponent } from './navigation/login-button/login-button.component';
import { FluxComponent } from './flux/flux.component';
import { HighlightComponent } from './highlight/highlight.component';
import { PostsComponent } from './posts/posts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LogoComponent,
    SearchboxComponent,
    SectionsLinksComponent,
    LoginButtonComponent,
    FluxComponent,
    HighlightComponent,
    PostsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
