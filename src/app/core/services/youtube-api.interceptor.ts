import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class YoutubeApiInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const URL_API = 'https://www.googleapis.com/youtube/v3';
    const API_KEY = 'AIzaSyAov4nMNzRPLgTjxkmt65z-sqyjN99Ml7g';
    return next.handle(request.clone({
      url: `${request.url}&key=${API_KEY}`
    }));
  }
}
