import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NewOrderService } from './new-order.service';
import * as fromModel from './new-order.json';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit {
  key = `Order${Date.now()}`;
  testOrderData = fromModel;
  constructor(private storage: Storage, private newOrderService: NewOrderService) {
  }

  saveToStorage() {
    this.storage.set(this.key, this.testOrderData);
  }

  fetchFromStorage() {
    this.storage.forEach((value, key, index) => {
      if (key.substring(0, 5) === 'Order') {
        console.log(value);
      }
    });
  }

  ngOnInit() {
    // Update Case
    // const order = this.newOrderService.getOrder();
    // if (order) {
    //   this.key = Object.keys(order)[0];
    //   this.testOrderData = order[this.key];
    // }
  }
}
