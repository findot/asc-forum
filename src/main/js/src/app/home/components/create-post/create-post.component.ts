import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faICursor, faInfoCircle, faItalic } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  faInfoCircle = faInfoCircle;
  faICursor = faICursor;

  title: string = '';
  content: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.createPost({ title: this.title, content: this.content }).subscribe(
      post => this.router.navigate(["post", post.id])
    )
  }

  get connected(): boolean {
    return this.authService.connected();
  }

}
