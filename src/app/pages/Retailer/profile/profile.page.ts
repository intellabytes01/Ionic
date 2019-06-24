import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { businessTypesData, regionsData } from '@app/pages/auth/register/store/register.reducers';
import { BusinessTypes, Regions } from '@app/pages/auth/register/store/register.actions';
import { RegisterState } from '@app/pages/auth/register/store/register.state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage implements OnInit, OnDestroy {

  public profileForm: FormGroup;
  disable = true;
  businessTypes: any[];
  regions: any[];
  imgPreview = '';
  businesstypeStore: any;
  regionStore: any;
  businessTypes$: any;
  regions$: any;
  
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private camera: Camera,
    private storeRegister: Store<RegisterState>
  ) {
    this.getBusinessTypes();
    this.businessTypes$ = this.storeRegister.pipe(select(businessTypesData));

    this.getRegions();
    this.regions$ = this.storeRegister.pipe(select(regionsData));
  }

  ngOnInit() {
    this.profileForm = this.formBuilder.group(
      {
        loginId: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        shopName: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        retailerName: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        address: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        pincode: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        email: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        mobile: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        telephone: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        drugLicenseNumber: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        gstin: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        region: [
          {value: '', disabled: true},
          Validators.compose([])
        ],
        businessType: [
          {value: '', disabled: true},
          Validators.compose([])
        ]
      }
    );
  }

  editProfile(val) {
    this.disable = val;
  }

  // photo library - this.takePhoto(0);
  // camera - this.takePhoto(1);

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

    this.camera.getPicture(options).then((imageData) => {
      this.imgPreview = imageData;
    }, (err) => {
    });
  }

  async getBusinessTypes() {
    this.storeRegister.dispatch(new BusinessTypes());
  }

  async getRegions() {
    this.storeRegister.dispatch(new Regions());
  }

  updateProfile() {

  }

  ngOnDestroy() {
  }

}
