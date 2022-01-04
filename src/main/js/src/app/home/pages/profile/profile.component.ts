import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faComment, faFeatherAlt, faHeading } from '@fortawesome/free-solid-svg-icons';

import { forkJoin } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

import { OrdPublished, Publication } from 'src/app/core/interfaces/Publication';
import { Account } from 'src/app/core/models/Account';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { isPost, isComment } from 'src/app/core/interfaces/Publication';
import { formatDistance } from 'date-fns';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faHeading = faHeading;
  faComment = faComment;
  faFeatherAlt = faFeatherAlt;

  account?: Account;
  publications: Publication[] = [];
  
  isPost = isPost;
  isComment = isComment;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.pipe(
      mergeMap(pm => {
        const id = pm.get('id');
        return this.apiService.getAccount(id && Number(id) || 'self');
      }),
      tap(acc => { this.account = acc; }),
      mergeMap((acc: Account) => forkJoin([
        this.apiService.getAccountPosts(acc.id),
        this.apiService.getAccountComments(acc.id)
      ])),
      map(([ps, cs]) => [...ps, ...cs])
    ).subscribe((publications: Publication[]) => {
      this.publications = pipe(
        publications,
        A.sort(OrdPublished),
      );
    });
  }
 
  public get registration(): string {
    if (!this.account) return '';
    
    const now = new Date();
    const registrationDate = Date.parse(this.account.registered);
    return formatDistance(registrationDate, now, { addSuffix: true });
  }
  
  onPublicationClick(postID: number): void
  { this.router.navigate(['post', postID]); }

}
