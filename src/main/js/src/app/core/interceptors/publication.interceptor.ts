import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';
import { isComment, isPost } from '../interfaces/Publication';


@Injectable()
export class PublicationInterceptor implements HttpInterceptor {
  
  intercept<T, U>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<U>> {
    return next.handle(req).pipe(map(r => this.handle(r)));
  }

  tagComment(comment: Comment | Comment[]): Comment | Comment[] {
    if (comment instanceof Array)
      return comment.map(c => this.tagComment(c) as Comment);
    (comment as any).tag = 'Comment';
    return comment;
  }

  tagPost(post: Post | Post[]): Post | Post[] {
    if (post instanceof Array)
      return post.map(p => this.tagPost(p) as Post);
    (post as any).tag = 'Post';
    return post;
  }

  tag<T>(t: T): T {
    if (t instanceof Array && t.length > 0) {
      if (isPost(t[0]))
        return this.tagPost(t) as any as T;
      if (isComment(t[0]))
        return this.tagComment(t) as any as T;
    }
    
    if (isPost(t))
      return this.tagPost(t) as any as T;
    if (isComment(t))
      return this.tagComment(t) as any as T;
    
    return t;
  }

  withBody<T>(response: HttpResponse<T>, body: T): HttpResponse<T>
  { return response.clone({ body }); }

  canHandle<T>(obj: T): boolean {
    return obj !== null && (
      isPost(obj) ||
      isComment(obj) ||
      (obj instanceof Array && obj.length > 0 && (this.canHandle(obj[0])))
    );
  }

  handle<T>(httpEvent: HttpEvent<T>): HttpEvent<T> {
    if (httpEvent.type !== HttpEventType.Response || !this.canHandle(httpEvent.body))
      return httpEvent;
    return this.withBody(httpEvent, this.tag(httpEvent.body) as T);
  }

}
