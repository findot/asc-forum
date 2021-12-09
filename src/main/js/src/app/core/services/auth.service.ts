import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/User';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:8080/api/auth'

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
      .post(`${this.endpoint}/login`, user)
      .pipe(map(_ => true), catchError(_ => of(false)));
  }

  public connected(): boolean
  { return this.token != null; }

}
