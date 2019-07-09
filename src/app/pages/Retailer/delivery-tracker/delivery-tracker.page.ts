import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { FilterModalPage } from './filter-modal/filter-modal.page';

@Component({
  selector: 'pr-delivery-tracker',
  templateUrl: './delivery-tracker.page.html',
  styleUrls: ['./delivery-tracker.page.scss'],
})
export class DeliveryTrackerPage implements OnInit, OnDestroy {
  deliveryList$: any;
  deliveryList: any[] = [];
  currentPage = 1;
  limit = 15;
  count = 0;
  deliveryFilter: any = { storeId: '', deliveryNo: ''};
  total: any = {
    amount: 0.0,
    count: 0
  };
  constructor(
    public modalController: ModalController,
    public router: Router
  ) {
    this.getDeliveryList();
  }

  ngOnInit() {}

  getDeliveryList() {
  }

  async presentModalInvoiceFilter() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: { value: this.deliveryFilter }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.deliveryFilter = data.data;
        this.deliveryList = [];
        this.getDeliveryList();
      }
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
