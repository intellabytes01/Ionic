import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import * as fromModel from './sales-return.json'

@Component({
  selector: 'pr-sales-return',
  templateUrl: './sales-return.page.html',
  styleUrls: ['./sales-return.page.scss'],
})
export class SalesReturnPage implements OnInit {

  salesReturnForm: FormGroup;
  storeList: any[] = [];
  SALESRETURNList: any[] = fromModel.SALESRETURN;
  searchList: any[] = [];
  productList: any[] = [];
  tempProductList: any[] = [];
  deliveryModeList: any[] = fromModel.deliveryModeList;
  testOrderData: any[] = [];
  key = `Order#${Date.now()}`;
  constructor(private store: Store<AuthState>, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      e => { }
    );

    this.salesReturnForm = this.formBuilder.group({
      store: [
        {
          StoreId: '',
          StoreName: ''
        },
        Validators.compose([])
      ],
      SALESRETURN: [
        {
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
      remarks: ['', Validators.compose([])],
      searchText: ['', Validators.compose([])]
    });
  }

  // Search in Product List

  search() {
    const list = [];
    if (this.salesReturnForm.value.searchText) {
      this.productList.map(element => {
        if (
          element.name
            .toLowerCase()
            .indexOf(this.salesReturnForm.value.searchText.toLowerCase()) !== -1
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
    this.salesReturnForm.patchValue({
      searchText: ''
    });
    const productPresent = this.tempProductList.find(element => {
      return element.id === product['id'];
    });
    if (!productPresent) {
      this.tempProductList.push(product);
    }
  }

  // Delete product

  deleteProduct(index) {
    this.salesReturnForm.patchValue({
      searchText: ''
    });
    this.testOrderData[this.key].productList.splice(index, 1);
    this.tempProductList.splice(index, 1);
  }

  // Set quantity of product selected

  setQuantity(index, val) {
    this.tempProductList[index].quantity = val.target.value;
  }

  // Add product and save as draft

  add(product: object) {
    this.testOrderData[this.key].productList.push(product);
  }

  // Create order

  createOrder() {}

  // Change Store

  changeStore(store) {}

  // Delete all

  deleteAll() {
    this.testOrderData[this.key].productList = [];
    this.tempProductList = [];
  }

  updateStore(val) {
    this.salesReturnForm.value.store.StoreId = val.StoreId;
  }

  updateSALESRETURN(val) {
    this.salesReturnForm.value.SALESRETURN.name = val.name;
  }

  changeDeliveryMode(val){
    this.salesReturnForm.value.deliveryMode.name = val.name;
  }

}
