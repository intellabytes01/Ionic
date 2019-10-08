import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuController, ModalController, Platform, AlertController } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as fromSideMenuJson from './sidemenu-Data.json';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {
  AuthState,
  getUserImage,
  getRetailerName,
  getRetailerId
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core/index.js';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { ImageUpload } from '@app/core/authentication/actions/auth.actions.js';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertService } from '../services/alert.service.js';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit, OnDestroy {
  public leftMenuPages = fromSideMenuJson.leftMenuData;

  public rightMenuPages = fromSideMenuJson.rightMenuData;
  dataReturned: any;
  photo: any;
  userImage: string;
  retailerName$: any;
  appVer = '0.0.1';
  imageUploadModal = false;
  imgUrl: string;
  retailerId: string;
  
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    private translateService: TranslateService,
    public modalController: ModalController,
    private sanitizer: DomSanitizer,
    private emailComposer: EmailComposer,
    public iab: InAppBrowser,
    private authStore: Store<AuthState>,
    private appVersion: AppVersion,
    public platform: Platform,
    private store: Store<AuthState>,
    private alertController: AlertController,
    private camera: Camera,
    private alertService: AlertService
  ) {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/dashboard' || e.url === '/') {
          this.getRetailerName();
        }
      }
    });
  }

  ngOnInit() {
    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      this.appVer = this.appVersion.getVersionNumber()['__zone_symbol__value'];
    }
    console.log(this.appVer);
    this.photo = 'assets/icon/user-default.png';
    this.storage.get('userData').then(data => {
      data = JSON.parse(data);
      if (data && data['userData']) {
        this.userImage = data['userData']['userSummary']['Userimage'];
        // this.getRetailerName();
      }
    });

    this.store
    .pipe(
      select(getRetailerId),
      untilDestroyed(this)
    )
    .subscribe(retId => {
      this.retailerId = retId;
    }, err => {
      console.log(err);
      this.imgUrl = '';
    });

    this.store
      .pipe(
        select(getUserImage),
        untilDestroyed(this)
      )
      .subscribe(imgUrl => {
        this.imgUrl = imgUrl;
        if (this.imgUrl) {
        }
      }, err => {
        console.log(err);
        this.imgUrl = '';
      });
  }

  ngOnDestroy() {}

  getRetailerName() {
    this.retailerName$ = this.authStore
      .pipe(
        select(getRetailerName),
        untilDestroyed(this)
      );
      // .subscribe(retailerName => {
      //   console.log(retailerName);
      //   if (retailerName && retailerName != null) {
      //     this.retailerName = retailerName;
      //   }
      // });
  }

  callNow(numberToCall) {
    this.iab.create(`tel:${numberToCall}`);
  }

  openPage(page) {
    this.menuCtrl.close();
    if (page.title === 'SIDEMENU.LOGOUT_TITLE') {
      this.logout();
      return true;
    }
    if (page.title === 'SIDEMENU.TERMS_TITLE') {
      window.open(
        this.translateService.instant('SIDEMENU.TERMS_URL'),
        '_system'
      );
    }
    if (page.title === 'SIDEMENU.PRIVACY_POLICY') {
      window.open(
        this.translateService.instant('SIDEMENU.PRIVACY_URL'),
        '_system'
      );
    }
    if (page.title === 'SIDEMENU.CALL_US') {
      this.callNow('02067660011');
    }
    if (page.title === 'SIDEMENU.EMAIL_US') {
      this.iab.create('mailto:care@pharmarack.com', '_system');
    }
    this.router.navigate([this.translateService.instant(page.url)]);
  }

  logout() {
    this.alertService.logoutModal(this.translateService.instant('SIDEMENU.LOGOUT_TITLE'),
    this.translateService.instant('DASHBOARD.LOGOUTAPP'));
    // this.storage.clear();
    // localStorage.clear();
    // this.router.dispose();
  }

  trackByFn(index) {
    return index;
  }

  async openModal() {
    const alert = await this.alertController.create({
      header: this.translateService.instant('IMAGE_UPLOAD.PROFILE_IMAGE_TITLE'),
      message: this.translateService.instant('IMAGE_UPLOAD.PROFILE_IMAGE_SUBTITLE'),
      buttons: [
        {
          text: 'Upload',
          role: null,
          handler: () => {
            this.takePhoto(0);
          }
        }, {
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
        this.photo = this.imgUrl;
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
        name: this.retailerId + '_PP.jpeg',
        data: imageData
      },
      type: 'PP',
      retailerId: Number(this.retailerId)
    };
    console.log('payload: ', payload);
    this.store.dispatch(new ImageUpload(payload));
  }


  // async openModal() {
  //   const modal = await this.modalController.create({
  //     component: ModalPopupPage,
  //     componentProps: {
  //       paramID: 123,
  //       paramTitle: 'Test Title',
  //       paramUserImageType: 'PP'
  //     },
  //     cssClass: 'modalClass'
  //   });

  //   modal.onDidDismiss().then(dataReturned => {
  //     console.log(dataReturned);
  //     if (dataReturned.data) {
  //       this.photo = dataReturned.data['imageUrl']['data'];
  //     }
  //   });
  //   return await modal.present();
  // }
}
