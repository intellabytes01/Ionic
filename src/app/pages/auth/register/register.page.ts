import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { AuthState } from '@app/core/authentication/auth.states';
import { SignUp } from '@app/core/authentication/actions/auth.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit {
  businessTypes: any[];
  regions: any[];
  passwordType = 'password';
  passwordIcon = 'eye-off';
  public registerForm: FormGroup;
  validation_messages = {
    mobile: [
      { type: 'required', message: 'Mobile number is required.' },
      {
        type: 'pattern',
        message: 'Mobile number must be at least 10 characters long.'
      }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      {
        type: 'minlength',
        message: 'Password must be at least 6 characters long.'
      }
    ],
    region: [{ type: 'validValue', message: 'Region is required.' }],
    businessType: [
      { type: 'validValue', message: 'Business Type is required.' }
    ]
  };
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  businesstypeStore: any;
  registerStore: any;
  regionStore: any;
  validateuserStore: any;
  constructor(
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private store: Store<AuthState>
  ) {
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false, 'menuLeft');
    this.menuCtrl.enable(false, 'menuRight');
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      mobile: [
        '',
        Validators.compose([
          Validators.pattern(this.mobnumPattern),
          Validators.required
        ])
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      region: [
        {
          RegionId: null,
          RegionName: ''
        },
        Validators.compose([this.validateRegion])
      ],
      businessType: [
        {
          BusinessTypeId: null,
          BusinessTypeName: ''
        },
        Validators.compose([this.validateBusinessType])
      ],
      agree: [false, Validators.compose([Validators.required])]
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  register() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }


    if (this.registerForm.value.agree) {
      const payload = {
        cred: this.registerForm.value
      };
      this.store.dispatch(new SignUp(payload));
    } else {
      this.alertService.presentToast('Please accept terms and conditions.');
    }
  }
  // Custom validation for Region

  validateRegion(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.RegionId) {
      return { validValue: true };
    }
    return null;
  }

  // Custom validation for BusinessType

  validateBusinessType(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    if (!control.value.BusinessTypeId) {
      return { validValue: true };
    }
    return null;
  }

  ngOnDestroy() {
    if (this.businesstypeStore) { this.businesstypeStore.unsubscribe(); }
    if (this.regionStore) { this.regionStore.unsubscribe(); }
    if (this.registerStore) { this.registerStore.unsubscribe(); }
    if (this.validateuserStore) { this.validateuserStore.unsubscribe(); }
  }

  trackByFn(index, item) {
    return index;
  }
}
