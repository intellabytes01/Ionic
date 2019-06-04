import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Page } from './interface/dashboard';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '@app/shared/services/utility.service';

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
    { name: 'DASHBOARD.NEWORDER', link: '/', icon: 'assets/icon/logo.png' },
    {
      name: 'DASHBOARD.PAYMENTS',
      link: '/payments',
      icon: 'assets/icon/logo.png'
    },
    {
      name: 'DASHBOARD.DRAFTORDER',
      link: '/draft-order',
      icon: 'assets/icon/logo.png'
    },
    {
      name: 'DASHBOARD.ADDDISTRIBUTOR',
      link: '/add-distributor',
      icon: 'assets/icon/logo.png'
    },
    {
      name: 'DASHBOARD.PRODUCTSEARCH',
      link: '/product-search',
      icon: 'assets/icon/logo.png'
    },
    {
      name: 'DASHBOARD.SCHEMES',
      link: '/schemes',
      icon: 'assets/icon/logo.png'
    }
  ];
  constructor(
    public menuCtrl: MenuController,
    private translateService: TranslateService,
    private utilityService: UtilityService
  ) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menuLeft');
    this.menuCtrl.enable(true, 'menuRight');
  }

  ngOnInit() {
    // const pageConstants = this.utilityService.objectToArray(
    //   this.translateService.instant('DASHBOARD')
    // );
    // pageConstants.forEach(element => {
    //   this.pages.push({
    //     name: element.type,
    //     link: '/',
    //     icon: 'assets/icon/logo.png'
    //   });
    // });
  }
}
