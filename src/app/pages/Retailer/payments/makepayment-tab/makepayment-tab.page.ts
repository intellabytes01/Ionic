import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OutstandingModalPage } from './outstanding-modal/outstanding-modal.page';
import * as fromModel from '../../feedback/feedback-data.json';

@Component({
  selector: 'app-makepayment-tab',
  templateUrl: './makepayment-tab.page.html',
  styleUrls: ['./makepayment-tab.page.scss'],
})
export class MakepaymentTabPage implements OnInit {

  toStoreIds: any[] = fromModel.toStoreIds;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModalOutstanding() {
    const modal = await this.modalController.create({
      component: OutstandingModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }
}
