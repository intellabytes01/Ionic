import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { MyOrderState } from '../store/myOrder.state';
import { Store, select } from '@ngrx/store';
import { MyOrderDetails } from '../store/myOrder.actions';
import { myOrderDetailsData } from '../store/myOrder.reducers';

@Component({
  selector: 'pr-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss']
})
export class MyOrderDetailsPage implements OnInit, OnDestroy {
  state$: Observable<object>;
  orderDetails: any = [];
  myOrderDetails$: any;
  totalOrderValue = 0;
  constructor(
    public activatedRoute: ActivatedRoute,
    public iab: InAppBrowser,
    private store: Store<MyOrderState>
  ) {
    this.myOrderDetails$ = this.store.pipe(select(myOrderDetailsData));
    this.myOrderDetails$.pipe(untilDestroyed(this)).subscribe(data => {
      if (data) {
        this.orderDetails = data;
      }
    });


    if (this.orderDetails.length > 0) {
      this.totalOrderValue = 0;
      this.orderDetails.forEach(element => {
        this.totalOrderValue += element['PTR'] * element['Quantity'];
      });
    }
  }

  ngOnInit() {
    this.orderDetails = [];
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data.data) {
        this.getMyOrderDetails(JSON.parse(data.data).OrderId);
      }
    });
  }

  getMyOrderDetails(oId) {
    const payload = {
      orderDetails: {
        orderId: oId,
        operation: 'view'
      }
    };
    this.store.dispatch(new MyOrderDetails(payload));
  }

  call(mobile) {
    this.iab.create(`tel:${mobile}`);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
