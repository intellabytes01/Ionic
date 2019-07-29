import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { FilterModalPage } from './filter-modal/filter-modal.page';
import { DeliveryTrackerState } from './store/delivery-tracker.state';
import { DeliveryTracker } from './store/delivery-tracker.actions';
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
        this.deliveryTrackerList = [

          {

       "StoreId": 111,

       "StoreName": "Desai Pharma",

       "PartyCode": "2336",

       "PartyName": "SHREE RAJENDRA CHEMIST",

       "DisplayPartyCode": "36490",

       "InvoiceNo": "77084",

       "OrderNo": "DPH52174",

       "InvoiceDate": "2018-10-27T18:30:00.000Z",

       "InvoiceAmt": 899,

       "DeliveryMan": "SURAJ",

       "DeliveryAssignedDate": "2018-02-12T18:30:00.000Z",

       "Status": "Dispatched",

       "DeliveryDate": "2018-10-29T05:50:13.000Z",

       "DeliveryRemarks": "Ret rejected",

       "RetailerRemarks": "jgvj",

       "UserId": 3214,

       "Username": "Suraj123",

       "NAME": "Suraj Chaurasia",

       "CreatedBy": 2607,

       "CreatedDate": "2018-02-15T11:25:08.000Z",

       "ModifiedBy": 3214,

       "ModifiedDate": "2018-10-29T05:50:13.000Z",

       "Latitude": "18.4813136",

       "Longitude": "73.830695"

   }

             ];
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

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
