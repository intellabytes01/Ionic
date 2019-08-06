import { Injectable, OnDestroy } from '@angular/core';
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
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;


/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor, OnDestroy {
  info: any;
  constructor(
    private store: Store<AuthState>,
    private topLoaderService: TopLoaderService
  ) {
    Device.getInfo().then((val)=>{
      this.info = val;
    });
  }

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
        'Content-Type': 'application/json',
        'DeviceUUID': this.info['uuid'] ? this.info['uuid'] : 'web',
        'IsMobileUser' : '1'
      }
    });

    this.store.pipe(select(selectAuthState)).subscribe(data => {
      if (data['userData'] && data['userData']['token'] && data['userData']['token']['token']) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${data['userData']['token']['token']}`
          }
        });
      }
    }),
      untilDestroyed(this);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Common condition for array
            if(Array.isArray(event['body']['data']) && event['body']['data'].length === 0){
              this.noRecordsFound();
            }else{
              this.noRecordsFoundHide();
            }
            // Condition for my orders
            if(event['body']['data'] && event['body']['data']['paginationData']){
              if(event['body']['data']['paginationData']['totalRecords'] == 0){
                this.noRecordsFound();
              }else{
                this.noRecordsFoundHide();
              }
            }
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

  noRecordsFound() {
    this.topLoaderService.norecord.next(true);
  }

  noRecordsFoundHide() {
    this.topLoaderService.norecord.next(false);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
