import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'pr-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss']
})
export class MyOrderDetailsPage implements OnInit, OnDestroy {
  state$: Observable<object>;
  orderDetails: any = {};
  constructor(public activatedRoute: ActivatedRoute, public iab: InAppBrowser) {

  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data.data) {
        this.orderDetails = JSON.parse(data.data);
      }
    });
  }

  call() {
    this.iab.create(`tel:${this.orderDetails.mobilenumber}`);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
