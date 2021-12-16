import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Publication } from 'src/app/core/interfaces/Publication';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Pipe({ name: 'author' })
export class AuthorPipe implements PipeTransform {

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  transform(publication?: Publication): Observable<string> {
    return new Observable(observer => {
      if (!publication)
        return observer.next('');
      if (publication!.author === this.authService.connectedUser?.id)
        return observer.next('you');
      this.apiService
        .getAccount(publication!.author!)
        .pipe(map(account => account.username))
        .subscribe(username => observer.next(username));
    });
  }

}
