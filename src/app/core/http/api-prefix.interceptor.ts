import { Injectable, OnDestroy } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError, merge, fromEvent, of } from 'rxjs';

import { environment } from '@env/environment';
import { untilDestroyed } from '../until-destroyed';
import { AuthState, selectAuthState } from '../authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { TopLoaderService } from '@app/shared/top-loader/top-loader.service';
import { tap, switchMap, catchError, map, mapTo } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { TokenRefresh } from '../authentication/actions/auth.actions';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

const { Device } = Plugins;

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor, OnDestroy {
  info: any;
  token = null;
  previousRequest = {
    request: null,
    next: null
  };
  constructor(
    private store: Store<AuthState>,
    private topLoaderService: TopLoaderService,
    private alert: AlertService,
    private router: Router,
    private storage: Storage
  ) {
    Device.getInfo().then(val => {
      this.info = val;
    });
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let isConnected = true;
    const online$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );

    online$.subscribe(connectionStatus => {
        isConnected = connectionStatus;
    });
    if (!isConnected) {
      this.alert.presentToast(
        'danger',
        'No Internet Connection'
      );
    } else {
      // console.log('Success Internet Connection');
    }
    if (request && request.url && isConnected) {
      return this.handle(next, request);
    }
  }

  handle(next, request) {
    if (!this.token) {
      this.store
        .pipe(
          select(selectAuthState),
          untilDestroyed(this)
        )
        .subscribe(data => {
          if (
            data['userData'] &&
            data['userData']['token'] &&
            data['userData']['token']['token']
          ) {
            this.token = data['userData']['token']['token'];
          }
        });
    }

    if (this.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`
        }
      });
    }

    this.showLoader();

    if (!/^(http|https):/i.test(request.url)) {
      request = request.clone({ url: environment.serverUrl + request.url });
    }
    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        DeviceUUID: this.info['uuid'] ? this.info['uuid'] : 'web',
        IsMobileUser: '1'
      }
    });

    if (request.url.split('v1')[1] === '/token/refresh') {
      this.store.pipe(select(selectAuthState)).subscribe(data => {
        request = request.clone({
          setHeaders: {
            RefreshToken: `Bearer ${data['userData']['token']['refreshToken']}`
          }
        });
      }),
        untilDestroyed(this);
    }

    // console.log(request);

    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // Common condition for array
            if (
              Array.isArray(event['body']['data']) &&
              event['body']['data'].length === 0
            ) {
              this.noRecordsFound();
            } else {
              this.noRecordsFoundHide();
            }
            // Condition for my orders
            if (
              event['body']['data'] &&
              event['body']['data']['paginationData']
            ) {
              if (
                event['body']['data']['paginationData']['totalRecords'] === 0
              ) {
                // this.noRecordsFound();
              } else {
                this.noRecordsFoundHide();
              }
            }
            this.hideLoader();
          }
        },
        (err: any) => {
          console.log(err);
          if (request.url.split('v1')[1] === '/token/refresh') {
            this.logout();
          }
          if (
            err.error.statusCode === 401 ||
            err.error.statusCode === 4050
          ) {
            this.alert.presentToast(
              'danger',
              'Your session is expired. Please login.'
            );
            // this.logout();
          }

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
    // this.topLoaderService.norecord.next(true);
  }

  noRecordsFoundHide() {
    this.topLoaderService.norecord.next(false);
  }

  logout() {
    this.storage.clear();
    localStorage.clear();
    this.router.dispose();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
