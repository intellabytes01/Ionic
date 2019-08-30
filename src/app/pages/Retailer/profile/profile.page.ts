import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {
  SaveProfileDetails,
  BusinessTypes,
  Regions,
  GetProfileDetails,
  ProfileActionTypes
} from './store/profile.actions';
import {
  ProfileState,
  businessTypesData,
  regionsData,
  getProfileDetails
} from './store/profile.reducers';
import { IProfileInterface } from './profile.interface';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { ModalController } from '@ionic/angular';
import { ModalPopupPage } from '@app/shared/modal-popup/modal-popup.page';
import {
  getUserId,
  getRegionId,
  getRetailerId,
  isUserAuthorized
} from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AlertService } from '@app/shared/services/alert.service';

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
  profileInterface: Partial<IProfileInterface>;
  userProfileDetails$: any;

  photo: SafeResourceUrl;
  dataReturned: any;
  userId: any;
  regionId: any;
  retailerId: any;
  isAuthorized: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera,
    private store: Store<ProfileState>,
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    private updates$: Actions,
    private alert: AlertService
  ) {
    this.getBusinessTypes();
    this.getRegions();
    this.getUserId();

    this.businessTypes$ = this.store.pipe(select(businessTypesData));
    this.store.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => {}
    );
    this.store.select(getRetailerId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.retailerId = state;
      },
      e => {}
    );

    this.store.select(isUserAuthorized, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.isAuthorized = state;
      },
      e => {}
    );

    this.regions$ = this.store.pipe(select(regionsData));
    // this.userProfileDetails$ = this.store.pipe(select(getProfileDetails));

    // .subscribe(data => {
    //   this.userProfileDetails$ = data;
    // });

    this.updates$
      .pipe(
        ofType(ProfileActionTypes.SAVEPROFILE_SUCCESS),
        untilDestroyed(this),
        tap(res => {
          this.alert.presentToast('success', 'Profile Updated Successfully');
          this.editProfile(true);
        })
      )
      .subscribe();
  }

  ngOnInit() {
    this.createForm();
    this.photo = 'assets/icon/gstin.png';
    this.userProfileDetails$ = this.store.pipe(select(getProfileDetails));
  }

  async getUserId() {
    await this.store
      .pipe(
        select(getUserId),
        untilDestroyed(this)
      )
      .subscribe(userId => {
        this.userId = userId;
        this.getProfileDetails(userId);
      });
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
      // cstNumber: [{ value: '', disabled: this.disable }],
      retailerId: [this.retailerId, Validators.compose([Validators.required])],
      region: [
        {
          regionId: this.regionId,
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
        if (key !== 'loginId' && key !== 'mobileNumber') {
          // && key !== 'businessType'
          this.profileForm.get(key).enable();
        } else {
          this.profileForm.get(key).disable();
        }
      });
      if (this.isAuthorized) {
        this.profileForm.get('shopName').disable();
        this.profileForm.get('licenseNumber').disable();
        this.profileForm.get('gstinNumber').disable();
      }
    } else {
      this.getProfileDetails(this.userId);
      Object.keys(this.profileForm.controls).forEach(key => {
        if (key !== 'loginId' && key !== 'shopName') {
          // && key !== 'businessType'
          this.profileForm.get(key).disable();
        }
      });
    }
  }

  updateProfile() {
    // stop here if form is invalid
    if (this.profileForm.invalid) {
      return;
    }
    if (this.profileForm.value) {
      if (this.profileForm.value.businessType) {
        delete this.profileForm.value.businessType;
      }
      if (this.profileForm.value.region) {
        delete this.profileForm.value.region;
      }

      this.profileInterface = {
        // cstNumber: this.profileForm.value.cstNumber.toString(),
        pincode: this.profileForm.value.pincode.toString(),
        regionId: this.profileForm.controls.region.value.regionId,
        firstName: this.profileForm.value.firstName,
        retailerName: this.profileForm.controls.shopName.value,
        retailerId: this.profileForm.value.retailerId,
        email: this.profileForm.value.email,
        mobileNumber: this.profileForm.value.mobileNumber 
        ? this.profileForm.value.mobileNumber : this.profileForm.controls['mobileNumber'].value,
        telephone: this.profileForm.value.telephone.toString(),
        address1: this.profileForm.value.address1,
        licenseNumber: this.profileForm.value.licenseNumber
        ? this.profileForm.value.licenseNumber : this.profileForm.controls['licenseNumber'].value,
        gstinNumber: this.profileForm.value.gstinNumber
        ? this.profileForm.value.gstinNumber : this.profileForm.controls['gstinNumber'].value,

        lastName: 'NoName',
        gstinOption: 'GSTIN'
      };

      const payload = {
        userProfileDetails: this.profileInterface
        // businessTypeId: this.profileForm.value.businessType.BusinessTypeId
      };
      this.store.dispatch(new SaveProfileDetails(payload.userProfileDetails));
    } else {
      // this.alertService.presentToast('danger', 'Please accept terms and conditions.');
    }
  }

  updateBussinessType() {
    // this.profileForm.value.BusinessTypeId = value.BusinessTypeId;
    // this.profileForm.value.BusinessTypeName = value.BusinessTypeName;
  }

  updateRegion(value) {
    this.profileForm.value.regionId = value.RegionId;
    // this.profileForm.value.RegionName = value.RegionName;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      componentProps: {
        paramID: 123,
        paramTitle: 'Test Title'
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      console.log(dataReturned);
      if (dataReturned.data) {
        this.photo = dataReturned.data;
      }
    });
    return await modal.present();
  }

  ngOnDestroy() {
    console.log(this.store);
  }
}
