import { Component, Input, OnInit } from '@angular/core';

import { faFlag, faTimes, faCheck, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Either } from 'fp-ts/lib/Either';


import { ApiService } from 'src/app/core/services/api.service';
import { Post } from 'src/app/core/models/Post';
import { Submission, loading, RequestFailure, asResult, toSubmission, Failed } from 'src/app/core/interfaces/Async';


@Component({
  selector: 'app-report-post-modal',
  templateUrl: './report-post-modal.component.html',
  styleUrls: ['./report-post-modal.component.scss']
})
export class ReportPostModalComponent implements OnInit {

  faTimes = faTimes;
  faFlag = faFlag;
  faCheck = faCheck;
  faExclamationTriangle = faExclamationTriangle;

  reason: string = '';

  submission: Submission<null> | null = null;
  failure: RequestFailure | null = null;

  @Input() post!: Post;

  constructor(
    private apiService: ApiService,
    public activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {
  }

  onConfirm() {

    this.submission = loading('Reporting...');
    const delayMs = 2000;

    const rq: Observable<Either<RequestFailure, any>> = asResult(
      this.apiService.reportPost(this.post.id, this.reason)
    );

    rq.pipe(
      delay(delayMs),
      map(v => toSubmission<RequestFailure, null>(v)),
      tap(submission => { this.submission = submission; }),
      delay(delayMs / 2)
    ).subscribe(result => {
      if (result.kind === "succeeded")
        return this.activeModal.close();
      result = result as Failed; // Cannot end up here if it' s not a failure
      this.failure = result.reason;
      this.submission = null;
    });
  }

}
