import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { formatDistance } from 'date-fns';


@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment?: Comment;
  
  constructor() {}

  ngOnInit(): void {}

}
