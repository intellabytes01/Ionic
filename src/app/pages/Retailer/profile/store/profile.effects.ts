import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  SaveProfileDetails,
  SaveProfileSuccess,
  SaveProfileFailure,
  ProfileActionTypes,
  BusinessTypes,
  BusinessTypesSuccess,
  BusinessTypesFailure,
  Regions,
  RegionsSuccess,
  RegionsFailure,
  GetProfileDetails,
  GetProfileSuccess,
  GetProfileFailure
} from './profile.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { ProfileService } from '../profile.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions: Actions,
    private profileService: ProfileService,
    private alert: AlertService
  ) {}


  // @Effect()
  // SaveProfileDetails: Observable<Action> = this.actions.pipe(
  //   ofType(ProfileActionTypes.SAVEPROFILE),
  //   map((action: SaveProfileDetails) => action.payload),
  //   switchMap(payload => {
  //     return this.profileService.getProfileDetails(payload).pipe(
  //       map(data => {
  //         return new SaveProfileSuccess({ saveProfile: data['data'] });
  //       }),
  //       catchError(error => of(new SaveProfileFailure({ error })))
  //     );
  //   })
  // );

  // @Effect({ dispatch: false })
  // ProfileSuccess: Observable<any> = this.actions.pipe(
  //   ofType(ProfileActionTypes.SAVEPROFILE_SUCCESS)
  // );

  // @Effect({ dispatch: false })
  // ProfileFailure: Observable<any> = this.actions.pipe(
  //   ofType(ProfileActionTypes.SAVEPROFILE_FAILURE),
  //   tap(() => {
  //     this.alert.presentToast('Invalid Profile Details');
  //   })
  // );

  // Business Types

  @Effect()
  BusinessTypes: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionTypes.BUSINESSTYPES),
    map((action: BusinessTypes) => {}),
    switchMap(() => {
      return this.profileService.getBusinessTypes().pipe(
        map(data => {
          return new BusinessTypesSuccess({ businessTypes: data['data'] });
        }),
        catchError(error => of(new BusinessTypesFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  BusinessTypesSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.BUSINESSTYPES_SUCCESS)
  );

  @Effect({ dispatch: false })
  BusinessTypesFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.BUSINESSTYPES_FAILURE)
  );

  // Regions

  @Effect()
  Regions: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionTypes.REGIONS),
    map((action: Regions) => {}),
    switchMap(() => {
      return this.profileService.getRegions().pipe(
        map(data => {
          return new RegionsSuccess({ regions: data['data'] });
        }),
        catchError(error => of(new RegionsFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  RegionsSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.REGIONS_SUCCESS)
  );

  @Effect({ dispatch: false })
  RegionsFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.REGIONS_FAILURE)
  );

  @Effect()
  GetProfileDetails: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionTypes.GETPROFILE),
    map((action: GetProfileDetails) => action.payload),
    switchMap(payload => {
      return this.profileService
        .getProfileDetails({ userId: Number(payload) })
        .pipe(
          map(data => {
            if (data.data.success) {
              return new GetProfileSuccess({ userProfile: data['data'] });
            } else {
              return new GetProfileFailure({ data });
            }
          }),
          catchError(error => of(new GetProfileFailure({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  GetProfileSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.GETPROFILE_SUCCESS)
  );

  @Effect({ dispatch: false })
  GetProfileFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.GETPROFILE_FAILURE)
  );

  @Effect()
  SaveProfileDetails: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionTypes.SAVEPROFILE),
    map((action: SaveProfileDetails) => action.payload),
    switchMap(payload => {
      return this.profileService
        .saveProfileDetails({ saveObj: payload })
        .pipe(
          map(data => {
            if (data) {
              return new SaveProfileSuccess({ userProfile: data['data'] });
            } else {
              return new SaveProfileFailure({ data });
            }
          }),
          catchError(error => of(new SaveProfileFailure({ error })))
        );
    })
  );

  @Effect({ dispatch: false })
  SaveProfileSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.SAVEPROFILE_SUCCESS)
  );

  @Effect({ dispatch: false })
  SaveProfileFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.SAVEPROFILE_FAILURE)
  );
}
