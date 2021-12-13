import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { Post } from 'src/app/core/models/Post';
import { Comment } from 'src/app/core/models/Comment';
import { ApiService } from 'src/app/core/services/api.service';
import { User } from 'src/app/core/models/User';
import { formatDistance } from 'date-fns';
import { faComment, faICursor, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {

  faComment = faComment;
  faICursor = faICursor;
  faTimes = faTimes;

  id?: number;
  post?: Post;
  author?: User;
  comments?: Comment[];

  userComment: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(mergeMap(paramMap => {
      this.id = Number(paramMap.get('id')!);
      return this.apiService.getPostById(this.id);
    })).pipe(mergeMap(post => {
      this.post = post;
      this.apiService.getAccount(post.author as number).subscribe(author => {
        this.author = author;
      })
      return this.apiService.getComments(this.id!);
    })).subscribe(comments => {
      this.comments = Array.from(comments.entries()).map(kv => kv[1]);
    })
  }

  public get dateString(): string {
    if (!this.post) return '';
    const now = new Date();
    const postDate = Date.parse(this.post.published!);
    return formatDistance(postDate, now, { addSuffix: true });
  }

  onSubmit() {
    console.log("submitting");
    this.apiService
      .postComment(this.id!, this.userComment!)
      .subscribe(comment => {
        console.warn(comment);
        this.comments?.unshift(comment);
        this.userComment = '';
      })
  }

  onClear() {
    this.userComment = '';
  }

}
