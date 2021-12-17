import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Post } from '../../../core/models/Post';
import { formatDistance } from 'date-fns';
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
