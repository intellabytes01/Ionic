import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MenuController, Events } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { AuthState } from '@app/core/authentication/auth.states';
import { SignUp } from '@app/core/authentication/actions/auth.actions';
import { BusinessTypes } from './store/register.actions';
import { businessTypesData } from './store/register.reducers';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit, OnDestroy {

  businessTypes$: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';
  public registerForm: FormGroup;
// tslint:disable-next-line: variable-name
  validation_messages = {
    mobile: [
      { type: 'required', message: 'Mobile number is required.' },
      {
        type: 'pattern',
        message: 'Mobile number must be 10 characters long.'
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
    private store: Store<AuthState>,
    private events: Events
  ) {
    this.events.subscribe('businessTypeChange', (businessTypeValue) => {
      this.registerForm.value.businessType.BusinessTypeId = businessTypeValue.BusinessTypeId;
      this.registerForm.value.businessType.BusinessTypeName = businessTypeValue.BusinessTypeName;
    }), untilDestroyed(this);

    this.getBusinessTypes();
    this.businessTypes$ = this.store.pipe(select(businessTypesData));
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

  async getBusinessTypes() {
    this.store.dispatch(new BusinessTypes());
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
  }

  trackByFn(index, item) {
    return index;
  }

  displayCounter(count) {
    // console.log(count);
}
}
