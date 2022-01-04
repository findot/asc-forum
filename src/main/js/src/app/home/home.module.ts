import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FluxComponent } from './components/flux/flux.component';
import { HighlightComponent } from './components/highlight/highlight.component';
import { PostComponent } from './components/post/post.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './pages/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { CreatePostComponent } from './components/create-post/create-post.component';
import { PostPageComponent } from './pages/post/post-page.component';
import { AppRoutingModule } from '../app-routing.module';
import { CommentComponent } from './components/comment/comment.component';
import { ActionButtonComponent } from './components/action-button/action-button.component';
import { DeletePostModalComponent } from './components/delete-post-modal/delete-post-modal.component';
import { ReportPostModalComponent } from './components/report-post-modal/report-post-modal.component';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    HomeComponent,
    FluxComponent,
    HighlightComponent,
    PostComponent,
    CreatePostComponent,
    PostPageComponent,
    CommentComponent,
    ActionButtonComponent,
    DeletePostModalComponent,
    ReportPostModalComponent,
    ProfileComponent
  ],
  exports: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NgbModule,
    SharedModule,
    AppRoutingModule
  ]
})
export class HomeModule { }
