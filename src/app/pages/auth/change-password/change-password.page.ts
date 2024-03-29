import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, selectAuthState } from '@app/core/authentication/auth.states';
import { ChangePassword } from './store/change-password.actions';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'pr-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {
  public changePasswordForm: FormGroup;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('CHANGE_PASSWORD.VALIDATION_MESSAGES');
  previousRouteUrl$: any;
  matchPasswordError = false;
  oldPwd = '';

  constructor(public formBuilder: FormBuilder, private store: Store<AuthState>, private translateService: TranslateService,
              private storage: Storage) {
    this.previousRouteUrl$ = this.store.select(selectAuthState);
    this.storage.get('tempPwd').then(data => {
      if (data) {
        this.oldPwd = data;
        // setting temp value to old password
        this.changePasswordForm.controls['oldPassword'].setValue('pharmarack');
      }
    });
    // this.store.select(selectAuthState).subscribe(data => {
    //   this.previousRouteUrl$ = data['previousUrl'];
    // });
  }

  ngOnInit() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      newPassword: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  async changePasswordClick() {
    // const credentials = {
    //   oldPassword: this.changePasswordForm.get('oldPassword'),
    //   newPassword: this.changePasswordForm.get('newPassword')
    // }
    const payload = {
      cred: {
        oldPassword: this.oldPwd ? this.oldPwd : this.changePasswordForm.get('oldPassword').value,
        newPassword: this.changePasswordForm.get('newPassword').value}
    };
    this.store.dispatch(new ChangePassword(payload));
    this.storage.remove('tempPwd');
  }
}
