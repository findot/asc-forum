import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../models/Post'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = "http://localhost:8080/api"

  posts: Map<number, Post> = new Map<number, Post>();

  constructor(private httpClient: HttpClient) {}

  public createPost(post: Post) {}

  public deletePost(id: number) {}

  public getPostById(id: number) {

  }

}
