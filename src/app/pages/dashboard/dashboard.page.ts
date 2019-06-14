import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
  pages: Page[] = [
    {
      name: 'DASHBOARD.NEWORDER',
      link: '/',
      icon: 'assets/icon/logo.png',
      disable: false
    },
    {
      name: 'DASHBOARD.PAYMENTS',
      link: '/payments',
      icon: 'assets/icon/logo.png',
      disable: false
    },
    {
      name: 'DASHBOARD.DRAFTORDER',
      link: '/draft-order',
      icon: 'assets/icon/logo.png',
      disable: false
    },
    {
      name: 'DASHBOARD.ADDDISTRIBUTOR',
      link: '/add-distributor',
      icon: 'assets/icon/logo.png',
      disable: false
    },
    {
      name: 'DASHBOARD.PRODUCTSEARCH',
      link: '/product-search',
      icon: 'assets/icon/logo.png',
      disable: false
    },
    {
      name: 'DASHBOARD.SCHEMES',
      link: '/schemes',
      icon: 'assets/icon/logo.png',
      disable: false
    }
  ];

  userData: object;
  constructor(
    public menuCtrl: MenuController,
    private translateService: TranslateService,
    private utilityService: UtilityService,
    private store: Store<AuthState>,
    private storage: Storage
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menuLeft');
    this.menuCtrl.enable(true, 'menuRight');
  }

  ngOnInit() {
    this.store.pipe(select(selectAuthState)).subscribe(data => {
      if (!data['userData']) {
        this.storage.get('userData').then((value: any) => {
          this.userData = JSON.parse(value)['userData'];
          this.setDisable();
        });
      } else {
        this.userData = data['userData']['data']['data']['userData'];
        this.setDisable();
      }

    }),
      untilDestroyed(this);
  }

  setDisable() {
    console.log(this.userData);
    if (!this.userData['retailerSummary']['retailerInfo']) {
        for (let i = 0; i <= 3; i++) {
          this.pages[i]['disable'] = true;
        }
      }
    if (
        this.userData['retailerSummary']['retailerInfo'] &&
        this.userData['retailerSummary']['retailerStoreParties']
      ) {
        this.pages[0]['disable'] = true;
      }
  }
}
