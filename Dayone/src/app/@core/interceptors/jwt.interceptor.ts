import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { getItem, StorageItem } from '../utils/local-storage.utils';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor() {}
  private authLocalStorageToken = `${environment.appVersion}-${environment.USERDATA_KEY}`;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const isLoggedIn = true;
    const user:any = localStorage.getItem(this.authLocalStorageToken);
    
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${(user!==null)?user:null}`,
        },
      });
    }

    return next.handle(request);
  }
}
