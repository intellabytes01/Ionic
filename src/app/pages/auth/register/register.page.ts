import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { Store, select } from '@ngrx/store';
import { AlertService } from '@app/shared/services/alert.service';
import { AuthState, isUserExists } from '@app/core/authentication/auth.states';
import { SignUp, UserExists } from '@app/core/authentication/actions/auth.actions';
import { BusinessTypes, Regions } from './store/register.actions';
import { businessTypesData, regionsData } from './store/register.reducers';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage implements OnInit, OnDestroy {
  businessTypes$: any;

  regions$: any;

  passwordType = 'password';
  passwordIcon = 'eye-off';
  public registerForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant(
    'REGISTER.VALIDATION_MESSAGES'
  );
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  numberOnly = '[0-9]*';
  businesstypeStore: any;
  registerStore: any;
  regionStore: any;
  validateuserStore: any;
  firstTimeLoad = true;
  isChecked = true;
  isUserExists: any;

  constructor(
    private alertService: AlertService,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private store: Store<AuthState>,
    private router: Router,
    private translateService: TranslateService
  ) {
    this.getBusinessTypes();
    this.store.pipe(select(businessTypesData)).subscribe(data => {
      this.businessTypes$ = data.sort(
        (a, b) => a.BusinessTypeId - b.BusinessTypeId
      );
    });

    this.getRegions();
    this.regions$ = this.store.pipe(select(regionsData));
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
          // Validators.pattern(this.mobnumPattern),
          Validators.pattern(this.numberOnly),
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
        Validators.compose([])
      ],
      businessType: [
        {
          BusinessTypeId: null,
          BusinessTypeName: ''
        },
        Validators.compose([])
      ],
      agree: [true, Validators.compose([Validators.required])]
    });
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async getBusinessTypes() {
    this.store.dispatch(new BusinessTypes());
  }

  async getRegions() {
    this.store.dispatch(new Regions());
  }

  register() {
    // stop here if form is invalid
    this.firstTimeLoad = false;
    if (
      this.registerForm.invalid ||
      !this.registerForm.value.region.RegionId ||
      !this.registerForm.value.businessType.BusinessTypeId
    ) {
      this.registerForm.get('mobile').markAsTouched();
      this.registerForm.get('password').markAsTouched();
      return;
    }
    if (this.registerForm.value.agree) {
      const payload = {
        cred: {
          mobile: this.registerForm.value.mobile,
          password: this.registerForm.value.password,
          regionId: this.registerForm.value.region.RegionId,
          businessTypeId: this.registerForm.value.businessType.BusinessTypeId
        }
      };
      this.store.dispatch(new SignUp(payload));
    } else {
      this.alertService.presentToast(
        'danger',
        'Please accept terms and conditions.'
      );
    }
  }

  validateForm() {
    if (this.registerForm.invalid) {
      this.firstTimeLoad = false;
      this.registerForm.get('mobile').markAsTouched();
      this.registerForm.get('password').markAsTouched();
      if (
        this.registerForm.invalid ||
        !this.registerForm.value.region.RegionId ||
        !this.registerForm.value.businessType.BusinessTypeId
      ) {
        return;
      }
      return;
    } else {
      this.register();
    }
    // do something else
  }

  ngOnDestroy() {}

  trackByFn(index, item) {
    return index;
  }

  updateBussinessType(value) {
    this.registerForm.value.businessType.BusinessTypeId = value.BusinessTypeId;
    this.registerForm.value.businessType.BusinessTypeName =
      value.BusinessTypeName;
  }

  updateRegion(value) {
    this.registerForm.value.region.RegionId = value.RegionId;
    this.registerForm.value.region.RegionName = value.RegionName;
  }

  validationMobile(value) {
    this.registerForm.controls.mobile.setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
  }

  checkIfUserExists() {
    const payload = {
      cred: {
        mobile: this.registerForm.value.mobile
      }
    };
    if (payload.cred.mobile.length === 10) {
      this.store.dispatch(new UserExists(payload));
      this.userExists();
    }
  }

  async userExists() {
    await this.store.pipe(select(isUserExists), untilDestroyed(this)).subscribe(userId => {
      this.isUserExists = userId;
    });
  }
}
