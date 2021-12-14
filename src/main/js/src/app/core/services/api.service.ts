import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post'
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap } from 'rxjs/operators';
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
    return this.get<User>(`${this.url}/accounts/${id}`).pipe(
      tap(account => this.accounts.set(id, account))
    );
  }

  // POSTS

  public createPost(post: Post) {
    return this.post<Post, Post>(`${this.url}/posts`, post).pipe(
      tap(post => {
        this.posts.set(post.id!, post);
        return post;
      })
    );
  }

  public deletePost(id: number) {}

  public getAllPosts(): Observable<Map<number, Post>> {
    return this.get<Post[]>(`${this.url}/posts`).pipe(
      map(posts => posts.reduce(
        (ps, p) => ps.set(p.id!, p),
        new Map<number, Post>()
      ))
    ).pipe(tap(posts => { this.posts = posts; }))
  }

  public getPostById(id: number): Observable<Post> {
    if (this.posts.has(id)) return of(this.posts.get(id)!);
    
    return this.get<Post>(`${this.url}/posts/${id}`).pipe(
      tap(post => this.posts.set(post.id!, post))
    );
  }

  // COMMENTS

  public getComments(postId: number): Observable<Map<number, Comment>> {
    const localComments = this.comments.get(postId);
    if (localComments !== undefined && localComments !== null)
      return of(localComments);
    
    return this.get<Comment[]>(`${this.url}/posts/${postId}/comments`).pipe(
      map(comments => {
        this.comments.set(postId, comments.reduce(
          (cs, c) => cs.set(c.id!, c),
          new Map<number, Comment>()
        ));
        return this.comments.get(postId)!;
      })
    );
  }

  public postComment(postId: number, content: string) {
    if (!this.authService.connected())
      throw new Error('Not connected');
    return this.post<Comment, Comment>(
      `${this.url}/posts/${postId}/comments`,
      { content }
    ).pipe(
      tap(comment => {
        this.comments.get(postId)?.set(comment.id!, comment);
      })
    );
  }

}
