import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/User';
import { RequestFailure } from '../models/RequestFailure';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = '/api/auth'

  private token?: string;

  constructor(private httpClient: HttpClient) {}

  public login(username: string, password: string) {
    const rq = this.httpClient.post<string>(
      `${this.endpoint}/login`,
      { username, password }
    );
    rq.subscribe(token => { this.token = token; })
    
    return rq.pipe(map(_ => true), catchError(_ => of(false)));
  }

  public register(user: User) {
    if (this.connected())
      throw new Error("Already connected");
    
    return this.httpClient
      .post(`${this.endpoint}/register`, user)
      .pipe(map(_ => ({ success: true })), catchError(this.onRegisterError));
  }

  public onRegisterError(errorResponse: HttpErrorResponse) {
    const error: RequestFailure = errorResponse.error as RequestFailure;
    return of(error);
  }

  public connected(): boolean
  { return this.token != null; }

}
