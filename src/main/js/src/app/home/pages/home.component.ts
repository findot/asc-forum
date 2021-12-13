import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/core/models/Post';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  posts: Map<number, Post> = new Map();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getAllPosts().subscribe(
      posts => { this.posts = posts; },
      err => console.warn(err) // TODO
    );
  }

}
