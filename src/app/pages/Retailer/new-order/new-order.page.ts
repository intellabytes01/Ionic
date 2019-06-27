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
  key = `Order#${Date.now()}`;
  testOrderData: any[] = [];
  storeList: any[] = [];
  searchList: any[] = [];
  productList: any[] = [];
  tempProductList: any[] = [];
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
      if (param.orderKey) {
        this.key = param.orderKey;
        this.storage.forEach((value, key, index) => {
          if (key === this.key) {
            console.log(value);
            this.testOrderData = value;
            this.setTempList();
          }
        });
      }
    });
    this.productList = Object.assign(this.productList, fromModel.data['Order#1561453855577'].productList);
    this.testOrderData = Object.assign(this.testOrderData, fromModel.data);
    this.setTempList();
  }

  setTempList() {
    this.key = 'Order#1561453855577';
    this.tempProductList = Object.assign(this.tempProductList, this.testOrderData[this.key].productList);
  }

  // Save to offline storage

  saveToStorage() {
    this.storage.set(this.key, this.testOrderData);
  }

  // Fetch draft order list (for testing will be moved to draft order page)

  fetchFromStorage() {
    this.storage.forEach((value, key, index) => {
      if (key.split('#')[0] === 'Order') {
        console.log(value);
      }
    });
  }

  ngOnInit() {
    this.neworderForm = this.formBuilder.group({
      searchText: ['', Validators.compose([])],
      store: [
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

  // Select Product from search list

  selectProduct(product: object) {
    this.neworderForm.patchValue({
      searchText: ''
    });
    const productPresent = this.tempProductList.find((element) => {
      return (element.id === product['id']);
    });
    if (!productPresent) {
      this.tempProductList.push(product);
    }
  }

  // Delete product

  deleteProduct(index) {
    this.neworderForm.patchValue({
      searchText: ''
    });
    this.testOrderData[this.key].productList.splice(index, 1);
    this.tempProductList.splice(index, 1);
  }

  // Set quantity of product selected

  setQuantity(index, val) {
    this.tempProductList[index].quantity = val;
  }

  // Add product and save as draft

  add(product: object) {
    this.testOrderData[this.key].productList.push(product);
    this.saveToStorage();
  }

  // Create order

  createOrder() {

  }

  // Change Store

  changeStore(store) {

  }

  // Delete all

  deleteAll() {
    this.testOrderData[this.key].productList = [];
    this.tempProductList = [];
  }

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
