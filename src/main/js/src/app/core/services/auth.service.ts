import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, mergeMap, share } from 'rxjs/operators';
import { forkJoin, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account } from '../models/Account';
import { RequestFailure } from '../interfaces/Async';
import { Stored, StoredService } from '../lib';
import jwtDecode from 'jwt-decode';
import { JWTToken } from '../interfaces/JWTToken';
import { RegisterRequest } from '../interfaces/Messages';


@Injectable({ providedIn: 'root' })
export class AuthService extends StoredService {

  // API Endpoint
  private endpoint: string = '/api/auth';
  private userEndpoint: string = '/api/accounts/self';

  // Account
  private account?: Account;

  @Stored<string>() private token?: string;
  private refreshTimeout?: ReturnType<typeof setTimeout>;

  /* --------------------------------- CTOR -------------------------------- */

  constructor(private httpClient: HttpClient) {
    super();
    if (this.token && this.connected) {
      this.setupRefreshLoop();
      this.fetchTokenAccount(this.token).subscribe(
        account => { this.account = account; }
      );
    }
  }

  /* -------------------------------- UTILS -------------------------------- */

  private setupRefreshLoop(): void {
    if (!this.connected) throw new Error('Not connected');
    
    const decodedToken = jwtDecode<JWTToken>(this.token as string);
    
    // Expiration time, in seconds
    const expiration      = decodedToken.exp;
    // Now, in seconds
    const now             = Math.floor(new Date().getTime() / 1000);
    // Remaining time, in minutes
    const remaining       = (expiration - now) / 60;
    // The amount of minutes before the token expires at which we want to
    // refresh the token
    const preventionTime  = Math.max(Math.floor(remaining / 5), 5);

    if (remaining < 0) return console.warn('Token expired');
    
    console.warn(`Token will refresh in ${Math.max(remaining - preventionTime, 0)} minute(s)`);
    this.refreshTimeout = setTimeout(() => {
      clearTimeout(this.refreshTimeout as unknown as number); // Node type conflict
      
      this.httpClient.get<{ token: string }>(
        `${this.endpoint}/refresh`,
      )
      .pipe(catchError(() => this.logout()))
      .subscribe(response => {
        // TODO - Investigate catchError boolean
        if (typeof response === 'boolean') return;
        this.token = response.token;
        this.setupRefreshLoop();
      }, _ => { this.token = undefined; });
    
    }, Math.max((remaining - preventionTime) * 60 * 1000, 0));
  }

  private onRegisterError(errorResponse: HttpErrorResponse) {
    const error: RequestFailure = errorResponse.error as RequestFailure;
    return of(error);
  }

  private fetchTokenAccount(token: string): Observable<Account> {
    return this.httpClient.get<Account>(
      this.userEndpoint,
      { headers: { Authorization: `Bearer ${token}` } }
    );
  }

  /* -------------------------------- PROPS -------------------------------- */

  /**
   * The current access token.
   */
  public get accessToken(): string | null {
    return this.token ? this.token : null;
  }

  /**
   * Whether the user is connected or not.
   */
  public get connected(): boolean {
    return (
      this.token !== null &&
      this.token !== undefined &&
      new Date(jwtDecode<JWTToken>(this.token).exp * 1000) > new Date()
    );
  }

  public get connectedUser(): Account | null {
    if (!this.connected)
      return null;
    return this.account!;
  }

  /* ---------------------- LOGIN / LOGOUT / REGISTER ---------------------- */

  /**
   * Login to the server as *username* with password *password*.
   * 
   * @param username The account username to identify as
   * @param password The account password
   * @returns A boolean observable that resolves to *true* if the
   *          identification process succeeded, *false* otherwise
   */
  public login(username: string, password: string) {
    return this.httpClient.post<{ token: string }>(
      `${this.endpoint}/login`,
      { username, password }
    ).pipe(
      mergeMap(response => forkJoin([
        of(response.token),
        this.fetchTokenAccount(response.token)
      ]))
    ).pipe(
      tap(([token, account]) => {
        this.token = token;
        this.account = account;
      }),
      share(),
      map(_ => true),
      catchError(_ => of(false))
    );
  }

  /**
   * Ends the user current connection, throws an error if there is no active 
   * connection.
   * 
   * @returns An observable that resolves once disconnected.
   */
  public logout() {
    if (!this.connected) throw new Error('Not connected');
  
    if (this.refreshTimeout) 
      clearTimeout(this.refreshTimeout as unknown as number);
    this.token = undefined;

    return of(true);
  }

  /**
   * Registers a user on the platform with the given information, solely the
   * username, email and password fields must be given. Other fields will be
   * discarded.
   * 
   * @param user The user to subscribe
   * @returns The observable of the request
   */
  public register(user: RegisterRequest) {
    if (this.connected) throw new Error('Already connected');
    
    return this.httpClient
      .post(`${this.endpoint}/register`, user)
      .pipe(map(_ => ({ success: true })), catchError(this.onRegisterError));
  }

}
