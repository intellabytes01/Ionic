import { Effect, Actions, ofType, createEffect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  ProfileActionTypes,
  ImageUpload,
  ImageUploadSuccess,
  ImageUploadFailure
} from './profile.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { ProfileService } from '../profile.service';

@Injectable()
export class ProfileEffects {
  constructor(
    private actions: Actions,
    private profileService: ProfileService
  ) {}

  // ImageUpload

  @Effect()
  ImageUpload: Observable<Action> = this.actions.pipe(
    ofType(ProfileActionTypes.IMAGEUPLOAD),
    map((action: ImageUpload) => action.payload),
    switchMap((payload) => {
      return this.profileService.uploadImage(payload).pipe(
        map(data => {
          return new ImageUploadSuccess({ imageUpload: data['data'] });
        }),
        catchError(error => of(new ImageUploadFailure({ error })))
      );
    })
  );

  @Effect({ dispatch: false })
  ImageUploadSuccess: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.IMAGEUPLOAD_SUCCESS)
  );

  @Effect({ dispatch: false })
  ImageUploadFailure: Observable<any> = this.actions.pipe(
    ofType(ProfileActionTypes.IMAGEUPLOAD_FAILURE)
  );
}
