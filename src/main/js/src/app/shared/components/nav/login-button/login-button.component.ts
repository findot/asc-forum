import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({ selector: 'login-button', templateUrl: './login-button.component.html' })
export class LoginButtonComponent {

  constructor(
    private authService: AuthService
  ) { }

  get connected(): boolean
  { return this.authService.connected; }

}
