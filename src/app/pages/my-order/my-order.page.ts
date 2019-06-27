import { Component, OnInit, ViewChild } from '@angular/core';
import { MyOrderList } from './store/myOrder.actions';
import { MyOrderState } from './store/myOrder.state';
import { Store, select } from '@ngrx/store';
import { myOrderData } from './store/myOrder.reducers';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { OrderFilterModalPage } from './order-filter-modal/order-filter-modal.page';

@Component({
  selector: 'pr-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  myOrderList$: any;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private store: Store<MyOrderState>,
    public modalController: ModalController,
  ) {
    this.getMyOrders();
    this.myOrderList$ = this.store.pipe(select(myOrderData));
   }

  ngOnInit() {
  }

  getMyOrders() {
    const payload = {
      orderDetails: {}
    };
    this.store.dispatch(new MyOrderList(payload));
  }

  async presentModalOrderFilter() {
    const modal = await this.modalController.create({
      component: OrderFilterModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }

  loadData(event) {
    const length = null;
    setTimeout(() => {
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (length === 1000) {
        event.target.disabled = true;
      }
    }, 500);
  }
}
