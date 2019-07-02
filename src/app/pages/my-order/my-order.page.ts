import { Component, OnInit, ViewChild } from '@angular/core';
import { MyOrderList } from './store/myOrder.actions';
import { MyOrderState } from './store/myOrder.state';
import { Store, select } from '@ngrx/store';
import { myOrderData } from './store/myOrder.reducers';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { OrderFilterModalPage } from './order-filter-modal/order-filter-modal.page';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss']
})
export class MyOrderPage implements OnInit {
  myOrderList$: any;
  myOrderList: any[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  currentPage = 1;
  limit = 15;
  count = 0;
  orderFilter: any = {
    fromDate: '16/01/17',
    toDate: '21/06/19',
    storeId: 151,
    orderNo: 'L1',
    operation: 'view',
    status: 'isplaced'
  };
  total: any = {
    amount: 0.00,
    count: 0
  };
  constructor(
    private store: Store<MyOrderState>,
    public modalController: ModalController,
    public router: Router
  ) {
    this.getMyOrders();
    this.myOrderList$ = this.store.pipe(select(myOrderData));
    this.myOrderList$.subscribe(data => {
      if (data) {
        this.count = data.length;
        this.myOrderList = this.myOrderList.concat(data);
      }
    }),
      untilDestroyed(this);
  }

  ngOnInit() {}

  getMyOrders() {
    const payload = {
      orderDetails: {
        fromDate: this.orderFilter.fromDate,
        toDate: this.orderFilter.toDate,
        storeId: this.orderFilter.storeId,
        orderNo: this.orderFilter.orderNo,
        operation: this.orderFilter.operation,
        status: this.orderFilter.status,
        pagination: {
          currentPage: this.currentPage,
          limit: this.limit,
          maxDateTime: '2019-06-26 05:53:33'
        }
      }
    };
    this.store.dispatch(new MyOrderList(payload));
  }

  async presentModalOrderFilter() {
    const modal = await this.modalController.create({
      component: OrderFilterModalPage,
      componentProps: { value: this.orderFilter }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.orderFilter = data.data;
        this.getMyOrders();
      }
    });
    return await modal.present();
  }

  loadData(event) {
    this.currentPage += 1;
    this.limit += this.limit;
    setTimeout(() => {
      this.getMyOrders();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.count < this.limit) {
        event.target.disabled = true;
      }
    }, 500);
  }

  goToOrderDetails(order) {
    this.router.navigateByUrl('myorder/my-order-details', { state: { data: JSON.stringify(order) } });
  }
}
