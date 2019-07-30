import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  Schemes,
  SchemesSuccess,
  SchemesFailure,
  SchemeCompanies,
  SchemeCompaniesSuccess,
  SchemeCompaniesFailure,
  SchemeProducts,
  SchemeProductsSuccess,
  SchemeProductsFailure
} from './schemes.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { SchemeService } from '../schemes.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';
import { SchemeAction } from './schemes.actions';

@Injectable()
export class SchemeEffects {
  constructor(
    private actions: Actions,
    private schemeService: SchemeService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Scheme Search

  @Effect()
  Schemes: Observable<Action> = this.actions.pipe(
    ofType(SchemeAction.SCHEMES),
    map((action: Schemes) => action.payload),
    switchMap((payload) => {
      return this.schemeService.getSchemes(payload).pipe(
        map(data => {
          return new SchemesSuccess({ companySearch: data['data'] });
        }),
        catchError(error => of(new SchemesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SchemesSuccess: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMES_SUCCESS)
  );

  @Effect({ dispatch: false })
  SchemesFailure: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMES_FAILURE)
  );

  // Scheme Companies

  @Effect()
  SchemeCompanies: Observable<Action> = this.actions.pipe(
    ofType(SchemeAction.SCHEMECOMPANIES),
    map((action: SchemeCompanies) => action.payload),
    switchMap((payload) => {
      return this.schemeService.getSchemeCompanies(payload).pipe(
        map(data => {
          return new SchemeCompaniesSuccess({ companyStores: data['data'] });
        }),
        catchError(error => of(new SchemeCompaniesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SchemeCompaniesSuccess: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMECOMPANIES_SUCCESS)
  );

  @Effect({ dispatch: false })
  SchemeCompaniesFailure: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMECOMPANIES_FAILURE)
  );

  // Scheme Products

  @Effect()
  SchemeProducts: Observable<Action> = this.actions.pipe(
    ofType(SchemeAction.SCHEMEPRODUCTS),
    map((action: SchemeProducts) => action.payload),
    switchMap((payload) => {
      return this.schemeService.getSchemeProducts(payload).pipe(
        map(data => {
          return new SchemeProductsSuccess({ companyProducts: data['data'] });
        }),
        catchError(error => of(new SchemeProductsFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  SchemeProductsSuccess: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMEPRODUCTS_SUCCESS)
  );

  @Effect({ dispatch: false })
  SchemeProductsFailure: Observable<any> = this.actions.pipe(
    ofType(SchemeAction.SCHEMEPRODUCTS_FAILURE)
  );

}
