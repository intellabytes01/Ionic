import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { untilDestroyed } from '../until-destroyed';
import { AuthState, selectAuthState } from '../authentication/auth.states';
import { Store, select } from '@ngrx/store';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor, OnDestroy {
  constructor(private store: Store<AuthState>) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    this.store.pipe(select(selectAuthState),
    untilDestroyed(this)).subscribe(data => {
      if (data['userData'] && data['userData']['token']) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${data['userData']['token']}`
          }
        });
      }
    });

    return next.handle(request);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }
}
