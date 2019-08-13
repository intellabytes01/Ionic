import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  PharmaProductsSuccess,
  PharmaProductsFailure,
  MallAction,
  PharmaProducts
} from './mall.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { MallService } from '../mall.service';
import { AlertService } from '@app/shared/services/alert.service';
import { Router } from '@angular/router';

@Injectable()
export class MallEffects {
  constructor(
    private actions: Actions,
    private mallService: MallService,
    private alert: AlertService,
    private router: Router
  ) {}

  // Mall Products

  @Effect()
  PharmaProducts: Observable<Action> = this.actions.pipe(
    ofType(MallAction.PHARMAPRODUCTS),
    map((action: PharmaProducts) => {}),
    switchMap(() => {
      return this.mallService.getPharmaProducts().pipe(
        map(data => {
          return new PharmaProductsSuccess({ mallProducts: data['data'] });
        }),
        catchError(error => of(new PharmaProductsFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  PharmaProductsSuccess: Observable<any> = this.actions.pipe(
    ofType(MallAction.PHARMAPRODUCTS_SUCCESS)
  );

  @Effect({ dispatch: false })
  PharmaProductsFailure: Observable<any> = this.actions.pipe(
    ofType(MallAction.PHARMAPRODUCTS_FAILURE)
  );

}
