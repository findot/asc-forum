import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';          

import { AuthService } from 'src/app/core/services/auth.service';


const passwordMatchValidator: ValidatorFn =
  (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const passwordConfirm = control.get('passwordConfirmation')?.value;
    
    if (!password || !passwordConfirm)
      return null;

    return (password === passwordConfirm)
      ? null
      : { passwordMismatch: true };
  }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  faExclamationTriangle = faExclamationTriangle;

  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    passwordConfirmation: ['', Validators.required]
  }, { validators: passwordMatchValidator });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    const { username, email, password } = this.form.value;
    const userRegistration = { username, email, password };
    
    this.form.get('password')?.setValue('');
    this.form.get('passwordConfirmation')?.setValue('');
    
    this.authService
      .register(userRegistration)
      .subscribe(registered => { 
        if (registered)
          this.router.navigate(['login']);
        else
          console.warn(registered); // FIXME
      });
  }

  get username() { return this.form?.get('username')!; }
  
  get email() { return this.form?.get('email')!; }
  
  get password() { return this.form?.get('password')!; }

  get passwordConfirmation() { return this.form?.get('passwordConfirmation')!; }

}
