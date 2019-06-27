import { Component, OnInit } from '@angular/core';
import { MyOrderList } from './store/myOrder.actions';
import { MyOrderState } from './store/myOrder.state';
import { Store, select } from '@ngrx/store';
import { myOrderData } from './store/myOrder.reducers';

@Component({
  selector: 'pr-my-order',
  templateUrl: './my-order.page.html',
  styleUrls: ['./my-order.page.scss'],
})
export class MyOrderPage implements OnInit {
  myOrderList$: any;

  constructor(
    private store: Store<MyOrderState>,
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
}
