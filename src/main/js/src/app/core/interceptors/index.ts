import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CacheInterceptor } from './cache.interceptor';
import { AuthInterceptor } from './auth.interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  // Add new interceptors here!
];
