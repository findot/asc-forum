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
  
  author?: User;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    const author = this.comment?.author as number;
    this.apiService.getAccount(author)
      .subscribe(author => { this.author = author; });
  }

  public get dateString(): string {
    if (!this.comment) return '';
    const now = new Date();
    const postDate = Date.parse(this.comment?.published!);
    return formatDistance(postDate, now, { addSuffix: true });
  }

}
