import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import {
  AuthState,
  selectAuthState,
  getRetailerName,
  getRetailerStatus
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';
import * as fromModel from './dashboard-data.json';
import { AlertService } from '@app/shared/services/alert.service';
import { Router, NavigationEnd } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { GetPreviousUrl } from '@app/core/authentication/actions/auth.actions.js';
import { takeLast } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy {
  pages: any[] = [];
  userData: object;
  backButton: any;
  permissions: object;
  routerSub = Subscription.EMPTY;

  constructor(
    public menuCtrl: MenuController,
    private translateService: TranslateService,
    private store: Store<AuthState>,
    private storage: Storage,
    private platform: Platform,
    private alert: AlertService,
    private router: Router,
    private socialSharing: SocialSharing,
    private alertCtrl: AlertController
  ) {
    this.routerSub = this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (e.url === '/dashboard') {
          this.getRetailerName();
          this.getRetailerStatus();
        }
      }
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menuLeft');
    this.menuCtrl.enable(true, 'menuRight');
    this.backButton = this.platform.backButton.subscribeWithPriority(
      9999,
      () => {
        this.presentAlertConfirm();
      }
    );
  }

  ionViewDidLeave() {
    if (this.backButton) {
      this.backButton.unsubscribe();
    }
  }

  ngOnInit() {
    const payload = {
      previousUrl: this.router.url
    };
    this.store.dispatch(new GetPreviousUrl(payload));
    
    this.pages = fromModel.data;
    this.permissions = fromModel.permissions;
    this.setPermissions();
    this.store
      .pipe(
        select(selectAuthState),
        untilDestroyed(this)
      )
      .subscribe(data => {
        if (!data['userData']) {
          this.storage.get('userData').then((value: any) => {
            if (value) {
              this.userData = JSON.parse(value)['userData'];
            }
          });
        } else {
          this.userData = data['userData']['userData'];
        }
      });
    untilDestroyed(this);
  }

  presentAlertConfirm() {
    this.alert.exitModal(this.translateService.instant('DASHBOARD.EXIT_APP'));
  }

  showUnAuthrorizedMessage() {
    this.alert.presentToast(
      'danger',
      this.translateService.instant('DASHBOARD.USER_ACTIVATION'),
      5000
    );
  }

  showUpdateProfileModal() {
    this.alert.confirmationModal(
      this.translateService.instant('DASHBOARD.UPDATE_PROFILE_MODAL_TITLE'),
      this.translateService.instant('DASHBOARD.UPDATE_PROFILE_MODAL_MESSAGE'),
      'profile'
    );
  }

  getRetailerName() {
    this.store
        .select(getRetailerName)
      .subscribe(retailerName => {
        if (!retailerName || retailerName == null || retailerName === '') {
          this.storage.get('retailerName').then(val => {
            if (val && val === '' || val == null) {
              this.showUpdateProfileModal();
            }
          });
        }
      });
  }

  async getRetailerStatus() {
    await this.store
      .pipe(
        select(getRetailerStatus),
        untilDestroyed(this)
      )
      .subscribe(retailerStatus => {
        if (
          retailerStatus &&
          retailerStatus != null &&
          retailerStatus !== 'Authorized'
        ) {
          this.showUnAuthrorizedMessage();
        }
      });
  }

  setPermissions() {
    this.pages = this.pages.map(val => {
      switch (this.permissions[val.name]['View']) {
        case 0:
          val.permissions[0]['perm'].push('VIEW');
          val.disable = true;
          break;

        case 1:
          val.permissions[0]['perm'].push('VIEW');
          val.disable = false;
          break;

        case 2:
        break;
      }
      return val;
    });
  }

  async share() {
    const alert = await this.alertCtrl.create({
      header: this.translateService.instant('TOOLBAR.POPUP_HEADER'),
      message: this.translateService.instant('TOOLBAR.POPUP_MESSAGE'),
      buttons: [
        {
          text: this.translateService.instant('TOOLBAR.DISTRIBUTOR'),
          cssClass: 'blue-color',
          handler: () => {
            this.socialSharing
              .share(
                this.translateService.instant(
                  'TOOLBAR.INVITE_MESSAGE_DISTRIBUTOR'
                )
              )
              .then(() => {
                console.log('success');
              })
              .catch(e => {
                console.log('share error: ', e);
              });
          }
        },
        {
          text: this.translateService.instant('TOOLBAR.RETAILER'),
          cssClass: 'blue-color',
          handler: () => {
            this.socialSharing
              .share(
                this.translateService.instant('TOOLBAR.INVITE_MESSAGE_RETAILER')
              )
              .then(() => {
                console.log('success');
              })
              .catch(e => {
                console.log('share error: ', e);
              });
          }
        }
      ]
    });

    alert.present();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
