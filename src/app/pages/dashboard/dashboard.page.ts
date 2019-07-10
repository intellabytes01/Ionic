import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { Page } from './interface/dashboard';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '@app/shared/services/utility.service';
import {
  AuthState,
  selectAuthState
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';
import * as fromModel from './dashboard-data.json';
import { NewOrderService } from '../Retailer/new-order/new-order.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {
  pages = [];
  userData: object;
  backButton: any;

  constructor(public menuCtrl: MenuController,
              private translateService: TranslateService,
              private utilityService: UtilityService,
              private store: Store<AuthState>,
              private storage: Storage,
              private newOrderService: NewOrderService,
              private platform: Platform,
              public alertController: AlertController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menuLeft');
    this.menuCtrl.enable(true, 'menuRight');
    this.backButton = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.presentAlertConfirm();
    });
  }

  ionViewDidLeave() {
    if (this.backButton) {
      this.backButton.unsubscribe();
   }
  }

  ngOnInit() {
    this.pages = fromModel.data;
    this.store.pipe(select(selectAuthState),
    untilDestroyed(this)).subscribe(data => {
      console.log(data);
      if (!data['userData']) {
        this.storage.get('userData').then((value: any) => {
          if (value) {
            this.userData = JSON.parse(value)['userData'];
            this.setDisable();
          }
        });
      } else {
        this.userData = data['userData']['userData'];
        this.setDisable();
      }
    });
    untilDestroyed(this);
  }

  setDisable() {
    if (!this.userData['retailerSummary']['retailerInfo']) {
      this.pages.forEach((element, index) => {
        switch (element.name) {
          // case 'DASHBOARD.NEWORDER':
          //   element.disable = true;
          //   break;

          case 'DASHBOARD.PAYMENTS':
            element.disable = true;
            break;

          case 'DASHBOARD.DRAFTORDER':
            element.disable = true;
            break;

          case 'DASHBOARD.ADDDISTRIBUTOR':
            element.disable = true;
            break;

          default:
            break;
        }
      });
    }
    if (
      this.userData['retailerSummary']['retailerInfo'] &&
      this.userData['retailerSummary']['retailerStoreParties']
    ) {
      // this.pages.forEach((element, index) => {
      //   if (element.name === 'DASHBOARD.NEWORDER') {
      //     element.disable = true;
      //   }
      // });
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: '',
      message: '<br><strong>Are you sure you want to exit the app?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Okay',
          handler: () => {
            navigator['app'].exitApp();
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
