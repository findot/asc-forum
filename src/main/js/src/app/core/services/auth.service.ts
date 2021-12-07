import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'http://localhost:8080/api/auth'

  private token?: string;

  constructor(
    private httpClient: HttpClient
  ) {}

  public login(username: String, password: String) {
    this.httpClient.post(
      `${this.endpoint}/login`,
      { username, password }
    ).toPromise()
      .then(x => console.log(x))
  }

  public connected() : boolean
  { return this.token != null; }

}
