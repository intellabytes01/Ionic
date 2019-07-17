import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MyOrderList } from './store/myOrder.actions';
import { MyOrderState } from './store/myOrder.state';
import { Store, select } from '@ngrx/store';
import { myOrderData } from './store/myOrder.reducers';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { OrderFilterModalPage } from './order-filter-modal/order-filter-modal.page';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import * as fromModel from './my-order-data.json';
import { format } from 'date-fns';

@Component({
  selector: 'pr-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss']
})
export class MyOrderPage implements OnInit, OnDestroy {
  myOrderList$: any;
  myOrderList: any[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  currentPage = fromModel.currentPage;
  limit = fromModel.limit;
  count = 0;
  orderFilter: any = fromModel.orderFilter;
  total: any = {
    amount: 0,
    count: 0
  };
  event: any;
  constructor(
    private store: Store<MyOrderState>,
    public modalController: ModalController,
    public router: Router
  ) {
    this.getMyOrders();
    this.myOrderList$ = this.store.pipe(select(myOrderData));
    this.myOrderList$.pipe(untilDestroyed(this)).subscribe(data => {
      if (data && data.returnData) {
        this.count = data.returnData.length;
        this.myOrderList = this.myOrderList.concat(data.returnData);
        this.total.amount = data.totalOrderAmount;
        this.total.count = data.paginationData.totalRecords;
        // App logic to determine if all data is loaded
        // and disable the infinite scroll
        if (this.event && this.count < this.limit) {
          this.event.target.disabled = true;
        }
      }
    });
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
          maxDateTime: format(new Date(), 'YYYY-MM-DD HH:mm:ss')
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
        this.myOrderList = [];
        this.getMyOrders();
      }
    });
    return await modal.present();
  }

  loadData(event) {
    this.event = event;
    this.currentPage += 1;
    setTimeout(() => {
      this.getMyOrders();
      event.target.complete();
    }, 500);
  }

  goToOrderDetails(order) {
    this.router.navigateByUrl('myorder/my-order-details', {
      state: { data: JSON.stringify(order) }
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
