import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { JWTToken } from '../interfaces/JWTToken';

import jwtDecode from 'jwt-decode'


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  private get token(): O.Option<string> {
    const tokenString = localStorage.getItem('token');
    if (tokenString === null)
      return O.none;
    return O.some(JSON.parse(tokenString));
  }

  private connected(): boolean {
    return pipe(
      this.token,
      O.map(token => jwtDecode<JWTToken>(token)),
      O.map(token => new Date(token.exp * 1000) > new Date()),
      O.getOrElse(() => false as boolean)
    );
  }

  intercept<T, U>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<U>> {
    if (this.connected()) {
      const token = O.getOrElse(() => '')(this.token);
      console.log(token);
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return next.handle(req);
  }

}