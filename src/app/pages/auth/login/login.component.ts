import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Platform, MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { environment } from '@env/environment';
import { I18nService, untilDestroyed } from '@app/core';
import { Store } from '@ngrx/store';
import { AuthState, selectAuthState } from '@app/core/authentication/auth.states';
import { LogIn } from '@app/core/authentication/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  getAuthState$: Observable<any>;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  loginForm: FormGroup;

// tslint:disable-next-line: variable-name
  validation_messages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      {
        type: 'minlength',
        message: 'Username must be at least 5 characters long.'
      },
      {
        type: 'maxlength',
        message: 'Username cannot be more than 25 characters long.'
      }
    ],
    password: [
      {
        type: 'required',
        message: 'Password is required.'
      },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.'
      }
    ]
  };

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'menuLeft');
    this.menuCtrl.enable(false, 'menuRight');
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private platform: Platform,
    private i18nService: I18nService,
    private store: Store<AuthState>,
    public menuCtrl: MenuController,
  ) {
    this.getAuthState$ = this.store.select(selectAuthState);
    this.createForm();
  }

  ngOnInit() {
    this.getAuthState$.pipe(untilDestroyed(this)).subscribe((state) => {
      if (state && state.isAuthenticated && state.user.token) {
        this.router.navigate(['/']);
      }
    });
  }

  ngOnDestroy() {}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        '9958387118',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.required
        ])
      ],
      password: [
        '123456',
        Validators.compose([Validators.minLength(6), Validators.required])
      ]
    });
  }

  async login() {
    const payload = {
      cred: this.loginForm.value
    };
    this.store.dispatch(new LogIn(payload));
  }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

  trackByFn(index, item) {
    return index;
  }

}
