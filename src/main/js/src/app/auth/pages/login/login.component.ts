import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username    : string  = '';
  password    : string  = '';
  accessDenied: boolean = false; 

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  @HostBinding('style') _hostStyle = 'height: 100%;';

  ngOnInit(): void {}

  onSubmit() {
    let password = this.password;
    this.password = '';
    this.authService
      .login(this.username, password)
      .subscribe(loggedIn => {
        if (loggedIn)
          this.router.navigate([""]);
        else 
          this.accessDenied = true;
      });
  }

}
