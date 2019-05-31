import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subscriber, Subject } from 'rxjs';

import { HttpCacheService } from './http-cache.service';
import { TopLoaderService } from '@app/shared/top-loader/top-loader.service';

/**
 * Caches HTTP requests.
 * Use ExtendedHttpClient fluent API to configure caching for each request.
 */
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private forceUpdate = false;
  private subject = new Subject<any>();

  constructor(private httpCacheService: HttpCacheService,
              private topLoaderService: TopLoaderService) {}

  /**
   * Configures interceptor options
   * @param options If update option is enabled, forces request to be made and updates cache entry.
   * @return The configured instance.
   */
  configure(options?: { update?: boolean } | null): CacheInterceptor {
    const instance = new CacheInterceptor(this.httpCacheService, this.topLoaderService);
    if (options && options.update) {
      instance.forceUpdate = true;
    }
    return instance;
  }

  removeRequest() {
    this.topLoaderService.isLoading.next(false  );
}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.topLoaderService.isLoading.next(true);
    // if (request.method !== 'GET') {
    //   return next.handle(request);
    // }
    // this.sendMessage('ENABLE_PROGRESSBAR');
    return new Observable((subscriber: Subscriber<HttpEvent<any>>) => {
      const cachedData = this.forceUpdate ? null : this.httpCacheService.getCacheData(request.urlWithParams);
      if (cachedData !== null) {
        // Create new response to avoid side-effects
        subscriber.next(new HttpResponse(cachedData as Object));
        subscriber.complete();
        this.removeRequest();
      } else {
        next.handle(request).subscribe(
          event => {
            if (event instanceof HttpResponse) {
              // this.sendMessage('DISABLE_PROGRESSBAR');
              this.httpCacheService.setPersistence('local');
              this.httpCacheService.setCacheData(request.urlWithParams, event);
            } else {
              // this.sendMessage('ENABLE_PROGRESSBAR');
            }
            this.removeRequest();
            subscriber.next(event);
          },
          error => { subscriber.error(error);
                     this.removeRequest(); },
          () => subscriber.complete()
        );
      }
    });
  }
}
