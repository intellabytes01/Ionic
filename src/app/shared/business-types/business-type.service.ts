import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import * as fromRoot from '../../app.reducer';
import * as UI from '../../shared/ui.actions';
import { Store } from '@ngrx/store';
import { Logger, CredentialsService, Credentials } from '@app/core';

const log = new Logger('BusinessTypes');

const routes = {
  getBusinessTypes: () => `/businesstypes`
};

@Injectable({
  providedIn: 'root'
})
export class BusinessTypeService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<fromRoot.State>,
    private credentialsService: CredentialsService
  ) {}

  getBusinessTypes(): Observable<Credentials> {
    return this.httpClient
      .get(routes.getBusinessTypes())
      .pipe(
        map((data: any) => ({
          data
        })),
        tap((data: any) => {
          // this.store.dispatch(new Auth.SetAuthenticated());
          this.credentialsService.setCredentials(data, true);
        }),
        catchError(error => this.errorHandler(error))
      );
  }

  // Customize the default error handler here if needed
  private errorHandler(response: HttpEvent<any>): Observable<HttpEvent<any>> {
    // if (!environment.production) {
    // Do something with the error
    log.error('Request error', response);
    this.store.dispatch(new UI.StopLoading());
    // }
    throw response;
  }
}
