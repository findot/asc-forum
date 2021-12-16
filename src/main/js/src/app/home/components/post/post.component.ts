import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Post } from '../../../core/models/Post';
import { formatDistance } from 'date-fns';
import { faComment } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  faComment = faComment;

  @Input() post!: Post;

  ngOnInit(): void {}

}
