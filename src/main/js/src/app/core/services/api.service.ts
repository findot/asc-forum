import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post'
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = "http://localhost:8080/api"

  posts: Map<number, Post> = new Map<number, Post>();

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

  public createPost(post: Post) {}

  public deletePost(id: number) {}

  public getAllPosts() {
    const rq = this.get<Post[]>(`${this.url}/posts`);
    rq.subscribe(posts => {
      this.posts = posts.reduce((ps, p) => ps.set(p.id!, p), new Map<number, Post>());
    });

    return rq;
  }

  public getPostById(id: number): Observable<Post> {
    if (this.posts.has(id)) return of(this.posts.get(id)!);
    
    const rq = this.get<Post>(`${this.url}/posts/${id}`);
    rq.subscribe(post => this.posts.set(post.id!, post));
    
    return rq;
  }

}
