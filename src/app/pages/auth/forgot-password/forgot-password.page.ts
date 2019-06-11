import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { OtpState } from './store/forgot-password.state';
import { SendOtp, VerifyOtp } from './store/forgot-password.actions';
import { Router } from '@angular/router';
import { sendOtpData, verifyOtpData } from './store/forgot-password.reducers';
import { AlertService } from '@app/shared/services/alert.service';

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
      { type: 'required', message: 'Mobile number is required.' },
      {
        type: 'pattern',
        message: 'Mobile number must be at least 10 characters long.'
      }
    ]
  };
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  constructor(
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private store: Store<OtpState>,
    private router: Router,
    private alert: AlertService
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
    this.store.dispatch(new SendOtp(sendOtpBody));
    this.store.pipe(select(sendOtpData)).subscribe(data => {
      if (data && data.otp) {
        this.showVerify = true;
      }
    });
  }

  verifyOtp() {
    const verifyOtpBody = {
      mobile: this.forgotPasswordForm.value.mobile,
      otp: this.forgotPasswordForm.value.otp
    };
    this.store.dispatch(new VerifyOtp(verifyOtpBody));
    this.store.pipe(select(verifyOtpData)).subscribe(data => {
      if (data && data.password) {
        this.router.navigate(['/login']);
      }
    });
  }

  // Custom validation for Mobile

  validationMobile(value) {
    this.forgotPasswordForm.controls.mobile.setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
  }

  ngOnDestroy() {}

  trackByFn(index, item) {
    return index;
  }
}
