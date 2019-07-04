import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { untilDestroyed } from '../until-destroyed';
import { AuthState, selectAuthState } from '../authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { TopLoaderService } from '@app/shared/top-loader/top-loader.service';
import { tap } from 'rxjs/operators';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  constructor(
    private store: Store<AuthState>,
    private topLoaderService: TopLoaderService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.showLoader();
    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    }

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json'
      }
    });

    this.store.pipe(select(selectAuthState)).subscribe(data => {
      if (data['userData'] && data['userData']['token']) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${data['userData']['token']}`
          }
        });
      }
    }),
      untilDestroyed(this);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.hideLoader();
          }
        },
        (err: any) => {
          this.hideLoader();
        }
      )
    );
  }

  showLoader() {
    this.topLoaderService.isLoading.next(true);
  }

  hideLoader() {
    this.topLoaderService.isLoading.next(false);
  }
}
