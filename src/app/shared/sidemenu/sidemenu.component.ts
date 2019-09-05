import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as fromSideMenuJson from './sidemenu-Data.json';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { DomSanitizer } from '@angular/platform-browser';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {
  public leftMenuPages = fromSideMenuJson.leftMenuData;

  public rightMenuPages = fromSideMenuJson.rightMenuData;
  dataReturned: any;
  photo: any;

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    private translateService: TranslateService,
    public modalController: ModalController,
    private sanitizer: DomSanitizer,
    private emailComposer: EmailComposer,
    public iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.photo = 'assets/icon/user-default.png';
  }

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
