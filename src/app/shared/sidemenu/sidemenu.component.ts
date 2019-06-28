import { Component, OnInit } from '@angular/core';

import { MenuController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { TranslateService } from '@ngx-translate/core';
import * as fromSideMenuJson from './sidemenu-Data.json';
import { ModalPopupPage } from '../modal-popup/modal-popup.page';
import { DomSanitizer } from '@angular/platform-browser';

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
  ) {}

  ngOnInit() {
    this.photo = '../../../assets/icon/user-default.png';
  }

  openPage(page) {
    this.menuCtrl.close();
    if (page.url === 'LOGIN_ROUTE') {
      this.logout();
    }
    if (page.title === 'TERMS_TITLE') {
      window.open(this.translateService.instant('TERMS_URL'), '_system');
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
        paramTitle: 'Test Title'
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data && dataReturned.data !== null) {
        this.dataReturned = dataReturned.data;
        this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(this.dataReturned && (this.dataReturned.dataUrl));
      }
    });
    return await modal.present();
  }
}
