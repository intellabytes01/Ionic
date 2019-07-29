import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NotificationFilterModalPage } from './notification-filter-modal/notification-filter-modal.page';

@Component({
  selector: 'pr-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {

  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModalNotificationFilter() {
    const modal = await this.modalController.create({
      component: NotificationFilterModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }
}
