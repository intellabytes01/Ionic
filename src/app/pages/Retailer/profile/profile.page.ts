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
import { ModalController, AlertController } from '@ionic/angular';
import { ModalPopupPage } from '@app/shared/modal-popup/modal-popup.page';
import {
  getUserId,
  getRegionId,
  getRetailerId,
  isUserAuthorized,
  AuthState,
  getUserImage
} from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { Actions, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AlertService } from '@app/shared/services/alert.service';
import { Storage } from '@ionic/storage';
import { ImageUpload } from '@app/core/authentication/actions/auth.actions';
import { TranslateService } from '@ngx-translate/core';
import {
  ImageResizer,
  ImageResizerOptions
} from '@ionic-native/image-resizer/ngx';
import { UtilityService } from '@app/shared/services/utility.service';

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
  dataReturned: any;
  userId: any;
  regionId: any;
  retailerId: any;
  isAuthorized = false;
  gstinOption = '1';
  gstinStatus = [
    { id: 1, name: 'Select GSTIN Option', selected: true },
    { id: 2, name: 'I have GSTIN Number', selected: false },
    { id: 3, name: 'I have applied', selected: false },
    { id: 4, name: 'I have not applied', selected: false },
    { id: 5, name: 'I am not eligible', selected: false }
  ];
  licenseImage: SafeResourceUrl = '';
  imageUploadModal = false;
  imgUrl: string;
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant(
    'PROFILE.VALIDATION_MESSAGES'
  );

  constructor(
    private formBuilder: FormBuilder,
    private camera: Camera,
    private store: Store<ProfileState>,
    private sanitizer: DomSanitizer,
    public modalController: ModalController,
    private updates$: Actions,
    private alert: AlertService,
    private storage: Storage,
    private storeAuth: Store<AuthState>,
    private alertController: AlertController,
    private translateService: TranslateService,
    private imageResizer: ImageResizer,
    private utilityService: UtilityService
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
        if (state === 'Authorized') {
          this.isAuthorized = true;
        }
      },
      e => {}
    );

    this.regions$ = this.store.pipe(select(regionsData));

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

    this.storeAuth
      .pipe(
        select(getUserImage),
        untilDestroyed(this)
      )
      .subscribe(
        imgUrl => {
          console.log(imgUrl);
          this.imgUrl = imgUrl;
          if (this.imgUrl) {
          }
        },
        err => {
          console.log(err);
          this.imgUrl = '';
        }
      );
  }

  ngOnInit() {
    this.createForm();
    this.licenseImage = 'assets/icon/gstin.png';
    this.userProfileDetails$ = this.store.pipe(select(getProfileDetails));
    this.store.pipe(select(getProfileDetails)).subscribe(data => {
      console.log(data);
    });
    this.storage.get('userData').then(data => {
      data = JSON.parse(data);
      if (data && data['userData']) {
        console.log('data: ', data['userData']['userSummary']);
        this.licenseImage = data['userData']['userSummary']['Druglicenseimage'];
        this.resizeImage();
      }
    });

    this.gstinStatus.forEach(element => {
      if (element.id.toString() === this.gstinOption) {
        element.selected = true;
      } else {
        element.selected = false;
      }
    });
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
        Validators.compose([])
      ],
      licenseNumber: [
        { value: '', disabled: this.disable },
        Validators.compose([])
      ],
      gstinNumber: [
        { value: '', disabled: this.disable },
        Validators.compose([
          Validators.minLength(15),
          Validators.maxLength(15),
          Validators.required
        ])
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
        if (
          key !== 'loginId' &&
          key !== 'mobileNumber' &&
          key !== 'gstinNumber'
        ) {
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

    this.utilityService.markFormGroupTouched(this.profileForm);
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
        pincode: this.profileForm.value.pincode.toString()
          ? this.profileForm.value.pincode.toString()
          : this.profileForm.controls['pincode'].value.toString(),
        // regionId: this.profileForm.controls.region.value.regionId
        //   ? this.profileForm.controls.region.value.regionId
        //   : this.profileForm.value.regionId,
        firstName: this.profileForm.value.firstName
          ? this.profileForm.value.firstName
          : this.profileForm.controls['firstName'].value,
        retailerName: this.profileForm.controls.shopName.value
          ? this.profileForm.controls['shopName'].value
          : this.profileForm.value.shopName.value,
        retailerId: this.profileForm.value.retailerId
          ? this.profileForm.value.retailerId
          : this.profileForm.controls['retailerId'].value,

        email: this.profileForm.value.email
          ? this.profileForm.value.email
          : this.profileForm.controls['email'].value,
        mobileNumber: this.profileForm.value.mobileNumber
          ? this.profileForm.value.mobileNumber
          : this.profileForm.controls['mobileNumber'].value,
        telephone: this.profileForm.value.telephone.toString()
          ? this.profileForm.value.telephone.toString()
          : this.profileForm.controls['telephone'].value.toString(),
        address1: this.profileForm.value.address1
          ? this.profileForm.value.address1
          : this.profileForm.controls['address1'].value,
        licenseNumber: this.profileForm.value.licenseNumber
          ? this.profileForm.value.licenseNumber
          : this.profileForm.controls['licenseNumber'].value,
        gstinOption: this.gstinOption.toString(),
        lastName: 'NoName'
      };

      if (
        (this.profileForm.value.gstinNumber &&
          this.profileForm.value.gstinNumber !== '') ||
        this.profileForm.value.gstinNumberr != null
      ) {
        this.profileInterface.gstinNumber = this.profileForm.value.gstinNumber;
      }
      if (
        (this.profileForm.controls['gstinNumber'].value &&
          this.profileForm.controls['gstinNumber'].value !== null) ||
        this.profileForm.controls['gstinNumber'].value !== ''
      ) {
        this.profileInterface.gstinNumber = this.profileForm.controls[
          'gstinNumber'
        ].value;
      }
      const payload = {
        userProfileDetails: this.profileInterface
        // businessTypeId: this.profileForm.value.businessType.BusinessTypeId
      };
      this.store.dispatch(new SaveProfileDetails(payload.userProfileDetails));
      this.storage.set('retailerName', this.profileInterface.firstName);
    } else {
      // this.alertService.presentToast('danger', 'Please accept terms and conditions.');
    }
  }

  updateRegion(value) {
    this.profileForm.value.regionId = value.RegionId;
    // this.profileForm.value.RegionName = value.RegionName;
  }

  // async openModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalPopupPage,
  //     componentProps: {
  //       paramID: 123,
  //       paramTitle: 'Test Title',
  //       paramUserImageType: 'DL'
  //     }
  //   });

  //   modal.onDidDismiss().then(dataReturned => {
  //     console.log(dataReturned);
  //     if (dataReturned.data) {
  //       this.photo = dataReturned.data['imageUrl']['data'];
  //     }
  //   });
  //   return await modal.present();
  // }

  setGstinStatus(event) {
    if (event.detail.value === 'I have GSTIN Number') {
      this.gstinOption = '2';
      this.profileForm.get('gstinNumber').enable();
    } else if (event.detail.value === 'I have applied') {
      this.gstinOption = '3';
      this.profileForm.get('gstinNumber').disable();
    } else if (event.detail.value === 'I have not applied') {
      this.profileForm.get('gstinNumber').disable();
      this.gstinOption = '4';
    } else if (event.detail.value === 'I am not eligible') {
      this.profileForm.get('gstinNumber').disable();
      this.gstinOption = '5';
    } else {
      this.profileForm.get('gstinNumber').disable();
      this.gstinOption = '1';
    }
  }

  async openModal() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('IMAGE_UPLOAD.PROFILE_IMAGE_TITLE'),
      message: this.translateService.instant(
        'IMAGE_UPLOAD.PROFILE_IMAGE_SUBTITLE'
      ),
      buttons: [
        {
          text: 'Upload',
          role: null,
          handler: () => {
            this.takePhoto(0);
          }
        },
        {
          text: 'Capture',
          role: null,
          handler: () => {
            this.takePhoto(1);
          }
        }
      ]
    });

    // this.alertController.dismiss().then(() => {
    //   console.log(this.imgUrl);
    // });

    await alert.present();
  }

  takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType,
      targetWidth: 500,
      targetHeight: 500
    };

    this.camera.getPicture(options).then(
      imageData => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        const base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log('*' + base64Image);
        this.uploadMedia(base64Image);
        this.licenseImage = this.imgUrl;
        // this.resizeImage();
      },
      err => {
        console.log('#' + err);
        // Handle error
      }
    );
  }

  uploadMedia(imageData) {
    const payload = {
      file: {
        name: this.retailerId + '_DL.jpeg',
        data: imageData
      },
      type: 'DL',
      retailerId: Number(this.retailerId)
    };
    console.log('payload: ', payload);
    this.store.dispatch(new ImageUpload(payload));
  }

  resizeImage() {
    const options = {
      uri: this.licenseImage,
      folderName: 'Protonet',
      quality: 90,
      width: 200,
      height: 200
    } as ImageResizerOptions;

    this.imageResizer
      .resize(options)
      .then((filePath: string) => {
        console.log('FilePath', filePath);
        this.licenseImage = filePath;
      })
      .catch(e => console.log(e));
  }

  ngOnDestroy() {}
}
