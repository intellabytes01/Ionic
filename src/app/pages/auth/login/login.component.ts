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
import { ModalController } from '@ionic/angular';
import { ModalPopupPage } from '@app/shared/modal-popup/modal-popup.page';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  version: string = environment.version;
  passwordType = 'password';
  passwordIcon = 'eye-off';
  loginForm: FormGroup;
  dataReturned:any;

// tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('LOGIN.VALIDATION_MESSAGES');

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
    public modalController: ModalController,
    private translateService: TranslateService
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  ngOnDestroy() {}

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: [
        '7775924331',
        Validators.compose([
          Validators.minLength(5),
          Validators.maxLength(25),
          Validators.required
        ])
      ],
      password: [
        '7775924331',
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

  // async openModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalPopupPage,
  //     componentProps: {
  //       "paramID": 123,
  //       "paramTitle": "Test Title"
  //     }
  //   });
 
  //   modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //       this.dataReturned = dataReturned.data;
  //       //alert('Modal Sent Data :'+ dataReturned);
  //     }
  //   });
 
  //   return await modal.present();
  // }
}
