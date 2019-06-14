import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { SideMenu } from './model/sidemenu';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss']
})
export class SidemenuComponent implements OnInit {

  public leftMenuPages: SideMenu[] = [
    {
      title: 'DASHBOARD_TITLE',
      url: 'DASHBOARD_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'PROFILE_TITLE',
      url: 'PROFILE_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'REFER_TITLE',
      url: 'REFER_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'CHANGE_PASSWORD_TITLE',
      url: 'CHANGE_PASSWORD_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'FEEDBACK_TITLE',
      url: 'FEEDBACK_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'NOTIFICATION_TITLE',
      url: 'DASHBOARD_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'TERMS_TITLE',
      url: 'DASHBOARD_ROUTE',
      icon: 'dashboard'
    },
    {
      title: 'LOGOUT_TITLE',
      url: 'LOGIN_ROUTE',
      icon: 'dashboard'
    }
  ];

  public rightMenuPages: SideMenu[] = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Add PO',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'View PO',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Draft PO',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Add distributor',
      url: 'add-distributor',
      icon: 'dashboard'
    },
    {
      title: 'Scheme',
      url: 'schemes',
      icon: 'dashboard'
    },
    {
      title: 'Product search',
      url: 'product-search',
      icon: 'dashboard'
    },
    {
      title: 'Payments',
      url: 'payments',
      icon: 'dashboard'
    },
    {
      title: 'Add Credit note',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'View Credit  note',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Pharma mall',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'Delivery tracker',
      url: '/dashboard',
      icon: 'dashboard'
    },
    {
      title: 'View invoice',
      url: '/dashboard',
      icon: 'dashboard'
    }
  ];

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private storage: Storage,
    private translateService: TranslateService
  ) {}

  ngOnInit() {}

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

  trackByFn(index, item) {
    return index;
  }
}
