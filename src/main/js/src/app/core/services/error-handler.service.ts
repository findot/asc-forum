import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  validationMessage(
    label: string,
    validationErrors: ValidationErrors
  ): string | null {
    const errors = validationErrors || {};
    
    for (const key in errors) {
      switch (key) {
        
        case 'minlength':
            return `${label} must be at least ${errors[key].requiredLength} characters long`;
        
        case 'email':
            return 'Please input a valid email address';
        
        case 'required':
          return `${label} is required`;
        
        case 'passwordMismatch':
          return `Passwords don't match`;
        
        case 'reserved':
          return `This ${label.toLowerCase()} is taken`;

        default:
          return 'Invalid';
      }
    }
    
    return null;
  }

}
