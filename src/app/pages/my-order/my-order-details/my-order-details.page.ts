import { Component, OnInit } from '@angular/core';
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
export class MyOrderDetailsPage implements OnInit {
  state$: Observable<object>;
  orderDetails: any = {};
  constructor(public activatedRoute: ActivatedRoute, public iab: InAppBrowser) {

  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe((data: any) => {
      if (data.data) {
        this.orderDetails = JSON.parse(data.data);
      }
    }),
    untilDestroyed(this);
  }

  call() {
    this.iab.create(`tel:${this.orderDetails.mobilenumber}`);
  }
}
