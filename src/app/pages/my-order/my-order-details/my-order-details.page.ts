import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'pr-my-order-details',
  templateUrl: './my-order-details.page.html',
  styleUrls: ['./my-order-details.page.scss'],
})
export class MyOrderDetailsPage implements OnInit {

  orderDetails: any = {};
  constructor(public route: ActivatedRoute, public iab: InAppBrowser) { 
    this.route.queryParams.subscribe(param => {
      console.log(param);
      if (param.data) {
        this.orderDetails = JSON.parse(param.data);
      }
    });
  }

  ngOnInit() {
  }

  call() {
    this.iab.create(`tel:${this.orderDetails.mobilenumber}`);
  }

}
