import { Component, OnInit } from '@angular/core';
import { PaymentFilterModalPage } from './payment-filter-modal/payment-filter-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-mypayments-tab',
  templateUrl: './mypayments-tab.page.html',
  styleUrls: ['./mypayments-tab.page.scss'],
})
export class MypaymentsTabPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModalPaymentFilter() {
    const modal = await this.modalController.create({
      component: PaymentFilterModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }
}