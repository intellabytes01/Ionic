import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { FilterModalPage } from './filter-modal/filter-modal.page';
import { DeliveryTrackerState } from './store/delivery-tracker.state';
import { DeliveryTracker, StatusUpdate } from './store/delivery-tracker.actions';
import { deliveryTrackerData } from './store/delivery-tracker.reducers';

@Component({
  selector: 'pr-delivery-tracker',
  templateUrl: './delivery-tracker.page.html',
  styleUrls: ['./delivery-tracker.page.scss'],
})
export class DeliveryTrackerPage implements OnInit, OnDestroy {
  deliveryTrackerList: any[] = [];
  searchText = '';
  deliveryFilter: any = {
    fromDate: '',
    toDate: '',
    status: '',
    query: '',
    store: ''
  };
  total: any = {
    amount: 0.0,
    count: 0
  };
  selectedValue: any;
  constructor(
    public modalController: ModalController,
    public router: Router,
    private store: Store<DeliveryTrackerState>
  ) {
    this.getDeliveryList();
  }

  ngOnInit() { }

  getDeliveryList() {
    const payload = {
      fromDate: this.deliveryFilter.fromDate,
      toDate: this.deliveryFilter.toDate,
      status: this.deliveryFilter.status,
      query: this.deliveryFilter.query,
      store: this.deliveryFilter.store
    };
    this.store.dispatch(new DeliveryTracker(payload));
    this.store.select(deliveryTrackerData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.deliveryTrackerList = state;
      },
      e => { }
    );
  }

  async presentModalDeliveryTrackerFilter() {
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: { value: this.deliveryFilter }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.deliveryFilter = data.data;
        this.deliveryTrackerList = [];
        this.getDeliveryList();
      }
    });
    return await modal.present();
  }

  async presentModalStatus(selectedValue) {
    this.selectedValue = selectedValue;
    const modal = await this.modalController.create({
      component: FilterModalPage,
      componentProps: { value: this.deliveryFilter, title: 'Status' }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.updateStatus(data.data);
      }
    });
    return await modal.present();
  }

  updateStatus(data) {
    const payload = {
      invoiceDate: this.selectedValue.InvoiceDate,
      invoiceNumber: this.selectedValue.InvoiceNo,
      latitude: this.selectedValue.Latitude,
      longitude: this.selectedValue.Longitude,
      userId: this.selectedValue.UserId,
      partyCode: this.selectedValue.PartyCode,
      status: data.status,
      remarks: data.remarks
    };
    this.store.dispatch(new StatusUpdate(payload));
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
