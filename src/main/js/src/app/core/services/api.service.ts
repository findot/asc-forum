import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  // Caching
  _posts   : Map<number, Post>                  = new Map();
  _accounts: Map<number, Account>               = new Map();
  _comments: Map<number, Map<number, Comment>>  = new Map();

  private requests: Map<string, Observable<any>> = new Map();
  private cachingTime: number = 30;
  
  /* --------------------------------- CTOR -------------------------------- */

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  /* -------------------------------- UTILS -------------------------------- */

  // Compute the necessary headers
  private get headers(): { Authorization?: string } {
    let headers: { Authorization?: string } = {};
    if (this.authService.connected)
      headers.Authorization = `Bearer ${this.authService.accessToken}`;
    return headers;
  }

  // Cache a request result for *cachingTime* seconds
  private setCachedRequest<T>(requestKey: string, request: Observable<T>) {
    this.requests.set(requestKey, request.pipe(share()));
    setTimeout(
      () => this.requests.delete(requestKey),
      this.cachingTime * 1000
    );
  }

  // Return a request cached result if there is one
  private getCachedRequest<T>(requestKey: string): Observable<T> | null {
    const cached = this.requests.get(requestKey);
    return cached === undefined ? null : cached;
  }

  /**
   * Execute a GET request on the given endpoint with the appropriate headers
   * (e.g auth headers).
   * 
   * @param endpoint The API endpoint, do NOT include the base api path as it
   *                 is already handled
   * @returns The observable of the request
   */
  private get<T>(endpoint: string): Observable<T> {
    const cacheKey = `GET:${endpoint}`;
    
    const cached = this.getCachedRequest<T>(cacheKey);
    if (cached !== null)
      return cached;
    
    const rq = this.httpClient.get<T>(`${this.url}${endpoint}`, {
      headers: this.headers
    });
    this.setCachedRequest<T>(cacheKey, rq);
    
    return rq;
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
    // POST shouldn't be cached
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
    const cachedKey = `DELETE:${endpoint}`;

    const cached = this.getCachedRequest<T>(cachedKey);
    if (cached !== null)
      return cached;
    
    const rq = this.httpClient.delete<T>(`${this.url}${endpoint}`, {
      headers: this.headers
    });
    this.setCachedRequest(cachedKey, rq);
    
    return rq;
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
  public createPost(post: PostRequest) {
    return this.post<Post, PostRequest>('/posts', post).pipe(
      tap(post => this._posts.set(post.id!, post))
    );
  }

  /**
   * TODO
   * 
   * @param id 
   */
  public deletePost(id: number) {
    // TODO - Check cached requests
    return this.delete(`/posts/${id}`).pipe(
      tap(() => this._posts.delete(id))
    );
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
    ).pipe(tap(posts => { this._posts = posts; }))
  }

  /**
   * Fetch the post whose id is *id*.
   * 
   * @param id The post id 
   * @returns An observable of the request which will result in a post if such
   *          post exist, an error otherwise.
   */
  public getPostById(id: number): Observable<Post> {
    if (this._posts.has(id)) return of(this._posts.get(id)!);
    
    return this.get<Post>(`/posts/${id}`).pipe(
      tap(post => this._posts.set(post.id!, post))
    );
  }

  public getAccountPosts(accountID: number | 'self'): Observable<Post[]> {
    return this.getAccount(accountID).pipe(mergeMap(account =>
      forkJoin(account.posts.map(postId => this.getPostById(postId)))
    ));
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
    return this.post<Post, {}>(`/posts/${id}/highlight`, {}).pipe(
      tap(p => { this._posts.set(p.id, p); })
    );
  }

  /* ------------------------------- COMMENTS ------------------------------ */

  /**
   * Fetch all the comments.
   * 
   * @returns An observable of the request which will result in an id-indexed
   *          map of comments.  
   */
  public getComments(postId: number): Observable<Map<number, Comment>> {
    const localComments = this._comments.get(postId);
    if (localComments !== undefined && localComments !== null)
      return of(localComments);
    
    return this.get<Comment[]>(`/posts/${postId}/comments`).pipe(
      map(comments => {
        this._comments.set(postId, comments.reduce(
          (cs, c) => cs.set(c.id!, c),
          new Map<number, Comment>()
        ));
        return this._comments.get(postId)!;
      })
    );
  }

  // TODO
  public getCommentById(id: number): Observable<Comment> {
    return this.get<Comment>(`/comments/${id}`); // TODO - Caching
  }

  // TODO
  public getAccountComments(accountID: number | 'self'): Observable<Comment[]> {
    return this.getAccount(accountID).pipe(mergeMap(account =>
      forkJoin(account.comments.map(commentId => this.getCommentById(commentId)))
    ));
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
    ).pipe(tap(comment => this._comments.get(postId)?.set(comment.id, comment)));
  }

}
