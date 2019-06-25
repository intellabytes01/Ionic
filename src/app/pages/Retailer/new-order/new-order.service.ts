import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewOrderService {
  private orderDetails: any;
  constructor() {}

  setOrder(val) {
    this.orderDetails = val;
  }

  getOrder() {
    return this.orderDetails;
  }
}
