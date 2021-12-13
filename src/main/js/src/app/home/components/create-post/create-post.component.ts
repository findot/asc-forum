import { Component, OnInit } from '@angular/core';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  faInfoCircle = faInfoCircle;

  title: string = '';
  content: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.apiService.createPost({ title: this.title, content: this.content });
  }

  get connected(): boolean {
    return this.authService.connected();
  }

}
