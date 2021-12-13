import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post'
import { Observable, of, Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Comment } from '../models/Comment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = '/api';

  posts   : Map<number, Post>                 = new Map();
  accounts: Map<number, User>                 = new Map();
  comments: Map<number, Map<number, Comment>> = new Map();

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): { Authorization?: string } {
    let headers: { Authorization?: string } = {};
    if (this.authService.connected())
      headers.Authorization = `Bearer ${this.authService.accessToken}`;
    return headers;
  }

  private get<T>(url: string) {
    return this.httpClient.get<T>(url, { headers: this.getHeaders() });
  }

  private post<T, U>(url: string, payload: U) {
    return this.httpClient.post<T>(url, payload, {
      headers: this.getHeaders()
    });
  }

  // ACCOUNTS

  public getAccount(id: number): Observable<User> {
    const localAccount = this.accounts.get(id);
    if (localAccount !== null && localAccount !== undefined)
      return of(localAccount);
    const rq = this.get<User>(`${this.url}/accounts/${id}`);
    return rq.pipe(map(account => {
      this.accounts.set(id, account);
      return account;
    }));
  }

  // POSTS

  public createPost(post: Post) {
    const rq = this.post<Post, Post>(`${this.url}/posts`, post);
    rq.subscribe(post => {
      this.posts.set(post.id!, post);
      return post;
    });
    return rq;
  }

  public deletePost(id: number) {}

  public getAllPosts(): Observable<Map<number, Post>> {
    const rq = this.get<Post[]>(`${this.url}/posts`);
    const res = rq.pipe(map(posts => {
      this.posts = posts.reduce(
        (ps, p) => ps.set(p.id!, p),
        new Map<number, Post>()
      );
      console.log(posts);
      return this.posts;
    }));

    return res;
  }

  public getPostById(id: number): Observable<Post> {
    if (this.posts.has(id)) return of(this.posts.get(id)!);
    
    const rq = this.get<Post>(`${this.url}/posts/${id}`);
    rq.subscribe(post => this.posts.set(post.id!, post));
    
    return rq;
  }

  // COMMENTS

  public getComments(postId: number): Observable<Map<number, Comment>> {
    const localComments = this.comments.get(postId);
    if (localComments !== undefined && localComments !== null)
      return of(localComments);
    
    const rq = this.get<Comment[]>(`${this.url}/posts/${postId}/comments`);
    const res = rq.pipe(map(comments => {
      this.comments.set(postId, comments.reduce(
        (cs, c) => cs.set(c.id!, c),
        new Map<number, Comment>()
      ));
      return this.comments.get(postId)!;
    }));

    return res;
  }

  public postComment(postId: number, content: string) {
    if (!this.authService.connected())
      throw new Error('Not connected');
    const rq = this.post<Comment, Comment>(`${this.url}/posts/${postId}/comments`, { content });
    return rq.pipe(map(comment => {
      this.comments.get(postId)?.set(comment.id!, comment);
      return comment;
    }));
  }
}
