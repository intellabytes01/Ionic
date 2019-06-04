import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss']
})
export class ForgotPasswordPage implements OnInit {
  otpData: any = {
    otp: '',
    expiredIn: ''
  };
  public forgotPasswordForm: FormGroup;
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
  otpStore: any;
  verifyotpStore: any;
  constructor(
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController
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
  }

  verifyOtp() {
  }

  // Custom validation for Mobile

  validationMobile(value) {
    this.forgotPasswordForm.controls.mobile.setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
  }

  ngOnDestroy() {
  }

  trackByFn(index, item) {
    return index;
  }
}
