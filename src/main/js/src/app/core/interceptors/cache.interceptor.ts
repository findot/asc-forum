import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class CacheInterceptor implements HttpInterceptor {

  private blacklist = ['/login', '/register', '/logout'];
  private requests = new Map<string, HttpResponse<any>>();
  private cachingTime = 5 * 1000;
  
  intercept<T, U>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<U>> {
    const cached = this.requests.get(req.url);
    if (req.method === 'GET' && cached !== undefined)
      return of(cached as HttpResponse<U>);
    
    if (req.method !== 'GET' || this.blacklist.includes(req.url))
      return next.handle(req);
  
    return next.handle(req).pipe(tap(response => this.cache(req.url, response)));
  }

  private cache<U>(url: string, response: HttpEvent<U>): void {
    if (response.type !== HttpEventType.Response)
      return;
    this.requests.set(url, response as HttpResponse<U>);
    setTimeout(() => this.requests.delete(url), this.cachingTime);
  }

}