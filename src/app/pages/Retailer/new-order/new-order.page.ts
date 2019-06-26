import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as fromModel from './new-order.json';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { SimilarProductsModalPage } from './similar-products-modal/similar-products-modal.page';

@Component({
  selector: 'pr-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit {
  private neworderForm: FormGroup;
  key = `Order${Date.now()}`;
  testOrderData = fromModel.data;
  searchList: any[] = [];
  productList: any[] = fromModel.data.Order1561453855577.productList;
  products$: any;
  deliveryModeList: any[] = fromModel.deliveryModeList;
  deliveryPriorityList: any[] = fromModel.deliveryPriorityList;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalController: ModalController
  ) {
    this.route.params.subscribe(param => {
      // Update Case
      // const order = this.newOrderService.getOrder();
      // if (order) {
      //   this.key = Object.keys(order)[0];
      //   this.testOrderData = order[this.key];
      // }
    });
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
    this.neworderForm = this.formBuilder.group({
      searchText: ['', Validators.compose([])],
      product: [
        {
          id: null,
          name: ''
        },
        Validators.compose([])
      ],
      deliveryMode: [
        {
          id: null,
          name: ''
        },
        Validators.compose([Validators.required])
      ],
      deliveryPriority: [
        {
          id: null,
          name: ''
        },
        Validators.compose([Validators.required])
      ],
      remarks: ['', Validators.compose([])]
    });
  }

  // Search in Product List

  search() {
    const list = [];
    if (this.neworderForm.value.searchText) {
      this.productList.map(element => {
        if (
          element.name.toLowerCase().indexOf(
            this.neworderForm.value.searchText.toLowerCase()
          ) !== -1
        ) {
          list.push(element);
        }
      });
      this.searchList = list;
    } else {
      this.searchList = [];
    }
  }

  selectProduct() {}

  createOrder() {}

  // Similar Products modal

  async presentModalSimilarProducts() {
    const modal = await this.modalController.create({
      component: SimilarProductsModalPage,
      componentProps: { title: 'Similar Products' }
    });
    modal.onDidDismiss().then(data => {
    });
    return await modal.present();
  }

  // Order History modal

  async presentModalOrderHistory() {
    const modal = await this.modalController.create({
      component: SimilarProductsModalPage,
      componentProps: { title: 'View Order History' }
    });
    modal.onDidDismiss().then(data => {
    });
    return await modal.present();
  }
}
