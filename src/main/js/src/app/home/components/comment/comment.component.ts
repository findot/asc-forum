import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models/Comment';


@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {

  @Input() comment?: Comment;
  
}
