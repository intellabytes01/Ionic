import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from '@ionic/angular';

@Component({
  selector: 'pr-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit {
  key = `Order${Date.now()}`;
  testOrderData = {};
  constructor(private storage: Storage, private events: Events) {    
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

  setOrderValue(order){    
    this.key = Object.keys(order)[0];
    this.testOrderData = order[this.key];
    console.log(this.key);
  }

  ngOnInit() {
    this.events.subscribe('orderUpdate', (order) => {
      console.log(order);
      this.setOrderValue(order);
    })
  }

  ngOnDestroy(){
    this.events.unsubscribe('orderUpdate');
  }
}
