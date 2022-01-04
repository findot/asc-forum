import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../core/models/Post';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  faComment = faComment;

  authService!: AuthService;

  @Input() post!: Post;

  ngOnInit(): void {}

  constructor(authService: AuthService) {
    this.authService = authService;
  }

}
