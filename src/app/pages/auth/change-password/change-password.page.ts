import { Component, OnInit, ContentChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, selectAuthState } from '@app/core/authentication/auth.states';
import { ChangePassword } from './store/change-password.actions';

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
  validation_messages = {
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.'
      }
    ]
  };
  previousRouteUrl$: any;

  constructor(public formBuilder: FormBuilder, private store: Store<AuthState>) { 
    this.previousRouteUrl$ = this.store.select(selectAuthState);
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

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async changePasswordClick() {
    // const credentials = {
    //   oldPassword: this.changePasswordForm.get('oldPassword'),
    //   newPassword: this.changePasswordForm.get('newPassword')
    // }
    const payload = {
      cred: {
        oldPassword: this.changePasswordForm.get('oldPassword').value,
        newPassword: this.changePasswordForm.get('newPassword').value}
    };
    this.store.dispatch(new ChangePassword(payload));
  }
}
