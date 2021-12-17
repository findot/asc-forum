import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Post } from 'src/app/core/models/Post';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-delete-post-modal',
  templateUrl: './delete-post-modal.component.html',
  styleUrls: ['./delete-post-modal.component.scss']
})
export class DeletePostModalComponent implements OnInit {

  @Input() post!: Post;

  faTimes = faTimes;

  constructor(
    private router: Router,
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  onConfirm() {
    this.activeModal.close('delete');
    this.apiService.deletePost(this.post!.id).subscribe(
      () => this.router.navigate(['']),
      () => { /* TODO */ }
    );
  }

}
