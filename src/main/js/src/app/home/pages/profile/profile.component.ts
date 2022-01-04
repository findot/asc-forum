import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faComment, faHeading } from '@fortawesome/free-solid-svg-icons';
import { forkJoin, merge, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { OrdPublished, Publication } from 'src/app/core/interfaces/Publication';
import { Account } from 'src/app/core/models/Account';
import { Post } from 'src/app/core/models/Post';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';
import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  faHeading = faHeading;
  faComment = faComment;

  account?: Account;
  publications: Publication[] = [];
  
  constructor(
    private route: ActivatedRoute,
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
  
}
