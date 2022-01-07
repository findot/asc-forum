import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Post } from '../models/Post'
import { forkJoin, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { map, mergeMap, share, tap } from 'rxjs/operators';
import { Account } from '../models/Account';
import { Comment } from '../models/Comment';
import { CommentRequest, PostRequest } from '../interfaces/Messages';


@Injectable({ providedIn: 'root' })
export class ApiService {

  // API Endpoint 
  private url: string = '/api';

  /* --------------------------------- CTOR -------------------------------- */

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /* -------------------------------- UTILS -------------------------------- */

  // Compute the necessary headers
  private get headers(): { Authorization?: string } {
    let headers: { Authorization?: string } = {};
    return headers;
  }

  /**
   * Execute a GET request on the given endpoint with the appropriate headers
   * (e.g auth headers).
   * 
   * @param endpoint The API endpoint, do NOT include the base api path as it
   *                 is already handled
   * @returns The observable of the request
   */
  private get<T>(endpoint: string, params: { [key: string]: any } = {}): Observable<T> {
    let rqParams = new HttpParams();
    for (const [k, v] of Object.entries(params))
      rqParams = rqParams.set(k, v);
    
    return this.httpClient.get<T>(`${this.url}${endpoint}`, {
      headers: this.headers,
      params
    });
  }

  /**
   * Execute a POST request on the given endpoint with the appropriate headers
   * (e.g auth headers).
   * 
   * @param endpoint The API endpoint, do NOT include the base api path as it
   *                 is already handled
   * @param payload The payload to send to the server
   * @returns The observable of the request
   */
  private post<T, U>(endpoint: string, payload: U) {
    return this.httpClient.post<T>(`${this.url}${endpoint}`, payload, {
      headers: this.headers
    });
  }

  /**
   * Execute a DELETE request on the given endpoint with the appropriate
   * headers (e.g auth headers).
   * 
   * @param endpoint The API endpoint, do NOT include the base api path as it
   *                 is already handled
   * @returns The observable of the request
   */
  private delete<T>(endpoint: string) {
    return this.httpClient.delete<T>(`${this.url}${endpoint}`, {
      headers: this.headers
    });
  }

  /* ------------------------------- ACCOUNTS ------------------------------ */

  /**
   * Fetch the account whose id is *id*.
   * 
   * @param id The account id
   * @returns An observable of the request which will result in an account
   *          if such account exist, an error otherwise.
   */
  public getAccount(id: number | 'self'): Observable<Account> {
    return this.get<Account>(`/accounts/${id}`);
  }

  /* -------------------------------- POSTS -------------------------------- */

  /**
   * Submit post data to the server for post creation. The post data must only
   * consist of the *title* and *content* attributes. Additional attributes
   * will be discarded.
   * 
   * @param post The post to submit
   * @returns An observable of the request which will result in a post if the
   *          post was created, an error otherwise.
   */
  public createPost(post: PostRequest): Observable<Post> {
    return this.post<Post, PostRequest>('/posts', post);
  }

  /**
   * TODO
   * 
   * @param id 
   */
  public deletePost(id: number) {
    return this.delete(`/posts/${id}`);
  }

  /**
   * Fetch all the posts.
   * 
   * @returns An observable of the request which will result in an id-indexed
   *          map of posts.  
   */
  public getAllPosts(): Observable<Map<number, Post>> {
    return this.get<Post[]>('/posts').pipe(
      map(posts => posts.reduce(
        (ps, p) => ps.set(p.id!, p),
        new Map<number, Post>()
      ))
    );
  }

  /**
   * Fetch the post whose id is *id*.
   * 
   * @param id The post id 
   * @returns An observable of the request which will result in a post if such
   *          post exist, an error otherwise.
   */
  public getPostById(id: number): Observable<Post> {
    return this.get<Post>(`/posts/${id}`);
  }

  public getAccountPosts(accountID: number | 'self'): Observable<Post[]> {
    return this.get<Post[]>(`/accounts/${accountID}/posts`);
  }

  /**
   * TODO
   * 
   * @param id 
   * @param reason 
   * @returns 
   */
  public reportPost(id: number, reason: string) {
    return this.post(`/posts/${id}/report`, { reason });
  }

  /**
   * TODO
   * 
   * @param id 
   * @param reason 
   * @returns 
   */
  public highlightPost(id: number) {
    return this.post<Post, {}>(`/posts/${id}/highlight`, {});
  }

  /* ------------------------------- COMMENTS ------------------------------ */

  /**
   * Fetch all the comments.
   * 
   * @returns An observable of the request which will result in an id-indexed
   *          map of comments.  
   */
  public getComments(postId: number): Observable<Map<number, Comment>> {
    return this.get<Comment[]>(`/posts/${postId}/comments`).pipe(
      map(comments => comments.reduce(
          (cs, c) => cs.set(c.id!, c),
          new Map<number, Comment>()
      ))
    );
  }

  // TODO
  public getCommentById(id: number): Observable<Comment> {
    return this.get<Comment>(`/comments/${id}`); // TODO - Caching
  }

  // TODO
  public getAccountComments(accountID: number | 'self'): Observable<Comment[]> {
    return this.get<Comment[]>(`/accounts/${accountID}/comments`);
  }

  /**
   * Submit a comment on post *postId* to the server for comment creation.
   * 
   * @param postId The post on which to submit the comment
   * @param content The comment content
   * @returns An observable of the request which will result in a comment if the
   *          comment was created, an error otherwise.
   */
  public createComment(postId: number, content: string) {
    if (!this.authService.connected)
      throw new Error('Not connected');
    return this.post<Comment, CommentRequest>(
      `/posts/${postId}/comments`,
      { content }
    );
  }

  public search(title: string): Observable<Post[]> {
    return this.get<Post[]>('/posts/search', { title });
  }

}
