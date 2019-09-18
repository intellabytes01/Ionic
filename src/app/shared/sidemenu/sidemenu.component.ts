import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as fromSideMenuJson from './sidemenu-Data.json';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AuthState, getUserImage } from '@app/core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core/index.js';

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
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    private translateService: TranslateService,
    public modalController: ModalController,
    private sanitizer: DomSanitizer,
    private emailComposer: EmailComposer,
    public iab: InAppBrowser,
    private authStore: Store<AuthState>
  ) {}

  ngOnInit() {
    this.photo = 'assets/icon/user-default.png';
    this.storage.get('userData').then(data => {
      data = JSON.parse(data);
      if (data && data['userData']) {
        console.log('data: ', data['userData']['userSummary']);
        this.userImage = data['userData']['userSummary']['Userimage'];
      }
    });
  }

  ngOnDestroy() {}

  callNow(numberToCall) {
    this.iab.create(`tel:${numberToCall}`);
  }

  openPage(page) {
    this.menuCtrl.close();
    if (page.title === 'SIDEMENU.LOGOUT_TITLE') {
      this.logout();
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
    this.storage.clear();
    localStorage.clear();
    this.router.dispose();
  }

  trackByFn(index) {
    return index;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ModalPopupPage,
      componentProps: {
        paramID: 123,
        paramTitle: 'Test Title',
        paramUserImageType: 'PP'
      }
    });

    modal.onDidDismiss().then(dataReturned => {
      console.log(dataReturned);
      if (dataReturned.data) {
        this.photo = dataReturned.data['imageUrl']['data'];
      }
    });
    return await modal.present();
  }
}
