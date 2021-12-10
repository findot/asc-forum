import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { faExclamationTriangle, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';          
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';

import { RequestFailure } from 'src/app/core/models/RequestFailure';
import { AuthService } from 'src/app/core/services/auth.service';
import { ErrorHandlerService } from 'src/app/core/services/error-handler.service';


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

  /* Font awesome icon, used in the template */
  faExclamationTriangle = faExclamationTriangle;
  /* Font awesome icon, used in the template */
  faCheck = faCheck;
  /* Font awesome icon, used in the template */
  faTimes = faTimes;

  /* Form fields */
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    passwordConfirmation: ['', [Validators.required, Validators.minLength(8)]]
  }, { validators: passwordMatchValidator });

  /* Flag set to true when we're waiting for a server response after
   * submitting the form */
  submissionLoading: boolean      = false;
  /* Flag set to true when the form submission succeeded */
  submissionSuccess: boolean      = false;
  /* Flag set to true when the form submission failed */
  /* Controls for how long the submission status (succes / error) will be shown
   * on the UI before to reset to default behavior */
  submissionError: boolean        = false;
  submissionStateTransitionTimer  = 4000;

  // CTOR

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {
    /* This method is called as an observable callback, so we have to bind it */
    this.onSubmissionResponse = this.onSubmissionResponse.bind(this);
  }

  ngOnInit(): void {}

  // GETTERS & SETTERS

  // The username field FormControl
  get username(): FormControl {
    return this.form?.get('username')! as FormControl;
  }
  
  // The email field FormControl
  get email(): FormControl {
    return this.form?.get('email')! as FormControl;
  }
  
  // The password field FormControl
  get password(): FormControl {
    return this.form?.get('password')! as FormControl;
  }

  // The password confirmation field FormControl
  get passwordConfirmation(): FormControl {
    return this.form?.get('passwordConfirmation')! as FormControl;
  }

  // The form error string to show in the ui
  get error(): string | null {
    return this.form.errors 
      ? this.errorHandlerService.validationMessage(
        'Confirmation',
        this.form.errors
      )
      : null;
  }

  // Whether we're currently waiting for a backend response, or not
  get processing(): boolean {
    return this.submissionLoading || this.submissionSuccess || this.submissionError;
  }

  // METHODS

  onSubmit() {
    if (this.processing) return;

    const { username, email, password } = this.form.value;
    const userRegistration = { username, email, password };
    
    this.password.reset();
    this.password.markAsPristine();
    this.passwordConfirmation.reset();
    this.passwordConfirmation.markAsPristine();

    this.submissionLoading = true;
    
    this.authService
      .register(userRegistration)
      .subscribe(this.onSubmissionResponse);
  }

  onSubmissionResponse(response: RequestFailure | { success: boolean }) {
    this.submissionLoading = false;

    if ('success' in response) {
    
      this.submissionSuccess = true;
      
      const timeout = setTimeout(() => {
        this.router.navigate(['login']);
        clearTimeout(timeout);
      }, this.submissionStateTransitionTimer);
    
    } else {
    
      this.submissionError = true;

      if (response.reason.email)
        this.email.setErrors({ 'reserved': true })
      if (response.reason.username)
        this.username.setErrors({ 'reserved': true })
      
      const timeout = setTimeout(() => {
        this.submissionError = false;
        clearTimeout(timeout);
      }, this.submissionStateTransitionTimer);
    
    }

  }

  // Tooltips
  handleSubmitHover(inout: boolean, tooltip: NgbTooltip) {
    if (!inout && tooltip.isOpen())
      return tooltip.close();
    if (inout && !this.form.valid)
      tooltip.open();
  }
  
}
