import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Page } from './model/dashboard';

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
    { name: 'NewOrder', link: '/', icon: 'assets/icon/logo.png' },
    { name: 'Payments', link: '/payments', icon: 'assets/icon/logo.png' },
    { name: 'DraftOrder', link: '/draft-order', icon: 'assets/icon/logo.png' },
    { name: 'AddDistributor', link: '/add-distributor', icon: 'assets/icon/logo.png' },
    { name: 'ProductSearch', link: '/product-search', icon: 'assets/icon/logo.png' },
    { name: 'Schemes', link: '/schemes', icon: 'assets/icon/logo.png' }
  ];
  constructor(public menuCtrl: MenuController) {}

  ionViewWillEnter() {
    this.menuCtrl.enable(true, 'menuLeft');
    this.menuCtrl.enable(true, 'menuRight');
  }

  ngOnInit() {
  }
}
