import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  AfterViewInit,
  AfterContentInit
} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  SaveProfileDetails,
  BusinessTypes,
  Regions,
  GetProfileDetails
} from './store/profile.actions';
import {
  ProfileState,
  businessTypesData,
  regionsData,
  getProfileDetails
} from './store/profile.reducers';
import { selectAuthState } from '@app/core/authentication/auth.states';
import { IProfileInterface } from './profile.interface';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProfilePage implements OnInit, OnDestroy {
  public profileForm: FormGroup;
  disable = true;
  businessTypes$: any;
  regions$: any;
  userDetails$: any;
  imgPreview = '';
  businesstypeStore: any;
  regionStore: any;
  profileInterface: IProfileInterface;
  userProfileDetails$: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private store: Store<ProfileState>
  ) {
    this.getBusinessTypes();
    this.getRegions();
    this.getProfileDetails('34627');

    this.businessTypes$ = this.store.pipe(select(businessTypesData));
    this.regions$ = this.store.pipe(select(regionsData));
    this.userProfileDetails$ = this.store.pipe(select(getProfileDetails));
    // this.userProfileDetails$ = this.store.pipe(select(getProfileDetails)).subscribe(data => {
    //   console.log(data);
    // });
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.profileForm = this.formBuilder.group({
      loginId: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      shopName: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      firstName: [
        { value: '', disabled: this.disable },
        Validators.compose([
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
        ])
      ],
      address1: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      pincode: [
        { value: '', disabled: this.disable },
        Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(6),
          Validators.required
        ])
      ],
      email: [
        { value: '', disabled: this.disable },
        Validators.compose([
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
          Validators.required
        ])
      ],
      mobileNumber: [
        { value: '', disabled: this.disable },
        Validators.compose([
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.required
        ])
      ],
      telephone: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      licenseNumber: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      gstinNumber: [
        { value: '', disabled: this.disable },
        Validators.compose([Validators.required])
      ],
      retailerId: [3, Validators.compose([Validators.required])],
      region: [
        {
          regionId: null,
          regionName: ''
        },
        Validators.compose([Validators.required])
      ],
      businessType: [
        {
          BusinessTypeId: null,
          BusinessTypeName: ''
        },
        Validators.compose([Validators.required])
      ]
    });
  }

  async getBusinessTypes() {
    this.store.dispatch(new BusinessTypes());
  }

  async getRegions() {
    this.store.dispatch(new Regions());
  }

  async getProfileDetails(userId) {
    await this.store.dispatch(new GetProfileDetails(userId));
  }

  editProfile(val) {
    this.disable = val;
    // this.profileForm.get('firstName').enable();
    if (!val) {
      Object.keys(this.profileForm.controls).forEach(key => {
        if (key !== 'loginId' && key !== 'shopName') {
          // && key !== 'businessType'
          this.profileForm.get(key).enable();
        }
      });
    } else {
      this.getProfileDetails('34627');
      Object.keys(this.profileForm.controls).forEach(key => {
        if (key !== 'loginId' && key !== 'shopName') {
          // && key !== 'businessType'
          this.profileForm.get(key).disable();
        }
      });
    }
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 80,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType,
      targetWidth: 500,
      targetHeight: 500
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.imgPreview = imageData;
      },
      err => {}
    );
  }

  updateProfile() {
    // stop here if form is invalid
    if (
      this.profileForm.invalid
      || !this.profileForm.value.regionId
      // || !this.profileForm.value.BusinessTypeId
    ) {
      return;
    }
    if (this.profileForm.value) {
      if (this.profileForm.value.businessType) {
        delete this.profileForm.value.businessType;
      }
      if (this.profileForm.value.region) {
        delete this.profileForm.value.region;
      }
      const payload = {
        userProfileDetails: this.profileForm.value
        // businessTypeId: this.profileForm.value.businessType.BusinessTypeId
      };
      this.store.dispatch(new SaveProfileDetails(payload.userProfileDetails));
    } else {
      // this.alertService.presentToast('Please accept terms and conditions.');
    }
  }

  updateBussinessType(value) {
    // this.profileForm.value.BusinessTypeId = value.BusinessTypeId;
    // this.profileForm.value.BusinessTypeName = value.BusinessTypeName;
  }

  updateRegion(value) {
    this.profileForm.value.regionId = value.RegionId;
    // this.profileForm.value.RegionName = value.RegionName;
  }

  ngOnDestroy() {}
}
