import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { OtpState } from './store/forgot-password.state';
import { SendOtp, VerifyOtp } from './store/forgot-password.actions';
import { Router } from '@angular/router';
import { sendOtpData, verifyOtpData } from './store/forgot-password.reducers';
import { AlertService } from '@app/shared/services/alert.service';
import { untilDestroyed } from '@app/core';
import { TranslateService } from '@ngx-translate/core';
import { GetPreviousUrl } from '@app/core/authentication/actions/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit, OnDestroy {
  showVerify = false;
  public forgotPasswordForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = {
    mobile: [
      { type: 'required', message: 'VALIDATIONS.MOBILEREQUIRED' },
      {
        type: 'pattern',
        message: 'VALIDATIONS.MOBILEPATTERN'
      }
    ]
  };
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  constructor(
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private store: Store<OtpState>,
    private router: Router,
    private alert: AlertService,
    private translateService: TranslateService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'menuLeft');
    this.menuCtrl.enable(false, 'menuRight');
  }

  ngOnInit() {
    this.forgotPasswordForm = this.formBuilder.group({
      mobile: [
        '',
        Validators.compose([
          Validators.pattern(this.mobnumPattern),
          Validators.required
        ])
      ],
      otp: ['', Validators.compose([Validators.required])]
    });
  }

  sendOtp() {
    const sendOtpBody = {
      mobile: this.forgotPasswordForm.value.mobile
    };
    if (!sendOtpBody.mobile) {
      this.alert.presentToast(
        'danger', this.translateService.instant('VALIDATIONS.MOBILEREQUIRED')
      );
      return;
    }
    if (sendOtpBody.mobile.length < 10) {
      this.alert.presentToast(
        'danger', this.translateService.instant('VALIDATIONS.MOBILEPATTERN')
      );
      return;
    }
    this.store.dispatch(new SendOtp(sendOtpBody));
    this.store.pipe(select(sendOtpData)).subscribe(data => {
      if (data && data.otp) {
        this.showVerify = true;
      }
    }),
      untilDestroyed(this);
  }

  verifyOtp() {
    const verifyOtpBody = {
      mobile: this.forgotPasswordForm.value.mobile,
      otp: this.forgotPasswordForm.value.otp
    };
    if (!verifyOtpBody.otp) {
      this.alert.presentToast(
        'danger', this.translateService.instant('VALIDATIONS.OTPREQUIRED')
      );
      return;
    }
    this.store.dispatch(new VerifyOtp(verifyOtpBody));

    const payload = {
      previousUrl: this.router.url
    };
    this.store.dispatch(new GetPreviousUrl(payload));

    this.store.pipe(select(verifyOtpData)).subscribe(data => {
      if (data && data.password) {
        this.router.navigate(['/change-password']);
      }
    }),
      untilDestroyed(this);
  }

  // Custom validation for Mobile

  validationMobile(value) {
    this.forgotPasswordForm.controls.mobile.setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
  }

  ngOnDestroy() {
    console.log(this.router.url);
  }

  trackByFn(index, item) {
    return index;
  }
}
