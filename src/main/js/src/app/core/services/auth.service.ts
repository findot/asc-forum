import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from '../models/User';
import { RequestFailure } from '../models/Async';
import { Stored, StoredService } from '../lib';
import jwtDecode from 'jwt-decode';
import { JWTToken } from '../models/JWTToken';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends StoredService {

  endpoint: string = '/api/auth'

  @Stored() private token?: string;
  refreshTimeout?: ReturnType<typeof setTimeout>;

  constructor(private httpClient: HttpClient) {
    super();
    if (this.token)
      this.setupRefreshLoop();
  }

  public get accessToken(): string {
    if (!this.connected())
      throw new Error('Not connected');
    return this.token!;
  }

  public login(username: string, password: string) {
    const rq = this.httpClient.post<{ token: string }>(
      `${this.endpoint}/login`,
      { username, password }
    );
    rq.subscribe(response => {
      this.token = response.token;
      console.warn(this.token);
      this.setupRefreshLoop();
    });
    
    return rq.pipe(map(_ => true), catchError(_ => of(false)));
  }

  public logout() {
    if (!this.connected())
      throw new Error("Not connected");
  
    if (this.refreshTimeout)
      clearTimeout(this.refreshTimeout as unknown as number);
    this.token = undefined;

    return of(true);
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
  { return this.token !== null && this.token !== undefined; }

  private setupRefreshLoop(): void {
    if (!this.connected())
      throw new Error('Not connected');
    
    const decodedToken: JWTToken = jwtDecode(this.token as string);
    
    const expiration = decodedToken.exp; // Expiration time, in seconds
    const now = Math.floor(new Date().getTime() / 1000); // Now, in seconds
    const remaining = (expiration - now) / 60; // Remaining time, in minutes

    if (remaining < 0)
      return console.warn('Token expired');
    
    console.warn(`Token will refresh in ${Math.max(remaining - 5, 1)} minute(s)`);
    this.refreshTimeout = setTimeout(() => {
      clearTimeout(this.refreshTimeout as unknown as number);
      this.httpClient.get<{ token: string }>(
        `${this.endpoint}/refresh`,
        { headers: { Authentication: `Bearer ${this.token}` }}
      ).subscribe(response => {
        this.token = response.token;
        this.setupRefreshLoop();
      }, _ => { this.token = undefined; });
    }, Math.max(remaining * 60 * 1000 - 5000, 1000));
  }

}
