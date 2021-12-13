import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/User';
import { ApiService } from 'src/app/core/services/api.service';
import { Post } from '../../../core/models/Post';
import { formatDistance } from 'date-fns';
import { faComment } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  faComment = faComment;

  @Input() post!: Post;
  author?: User;

  constructor(
    private apiService: ApiService
  ) { }

  public get dateString(): string {
    const now = new Date();
    const postDate = Date.parse(this.post.published!);
    return formatDistance(postDate, now, { addSuffix: true });
  }

  ngOnInit(): void {
    this.apiService.getAccount(this.post.author! as number)
      .subscribe(user => { this.author = user; });
  }

}
