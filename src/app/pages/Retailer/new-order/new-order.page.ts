import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/core/index.js';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as fromModel from './new-order.json';
import { SimilarProductsModalPage } from './similar-products-modal/similar-products-modal.page';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDetails, NewOrderState } from './store/new-order.state';
import { Store } from '@ngrx/store';
import { ProductSearch } from './store/new-order.actions';
import { productSearchData } from './store/new-order.reducers';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states.js';

@Component({
  selector: 'pr-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit, OnDestroy {
  public neworderForm: FormGroup;
  key = `Order#${Date.now()}`;
  orderData: any[] = [];
  storeList: any[] = [];
  searchList: any[] = [];
  tempProductList: any[] = [];
  products$: any;
  deliveryModeList: any[] = fromModel.deliveryModeList;
  deliveryPriorityList: any[] = fromModel.deliveryPriorityList;
  state$: Observable<object>;
  similarProducts: any[] = [];

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    public activatedRoute: ActivatedRoute,
    private store: Store<NewOrderState>,
    private authStore: Store<AuthState>
  ) {}

  setTempList() {
    this.tempProductList = Object.assign(
      this.tempProductList,
      this.orderData[this.key].productList
    );
  }

  // Save to offline storage

  saveToStorage() {
    this.orderData[this.key]['key'] = this.key;
    this.storage.set(this.key, this.orderData);
  }

  ngOnInit() {
    this.authStore.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      e => { }
    );
    this.orderData[this.key] = {
      productList: []
    };
    // Draft Order Update Case
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data.orderKey) {
        this.key = data.orderKey;
        this.storage.forEach((value, key, index) => {
          if (key === this.key) {
            this.orderData = value;
            this.setTempList();
          }
        });
      }
    });

    this.neworderForm = this.formBuilder.group({
      searchText: ['', Validators.compose([])],
      store: [
        {
          StoreId: null,
          StoreName: ''
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
    if (this.neworderForm.value.searchText.length === 0) {
      this.searchList = [];
    } else {
      const payload = {
        regionId: 1,
        query: this.neworderForm.value.searchText,
        page: 1
      };

      this.store.dispatch(new ProductSearch(payload));

      this.store.select(productSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.searchList = state;
        },
        e => {}
      );
    }
  }

  // Select Product from search list

  selectProduct(product) {
    this.similarProducts = Object.assign(this.similarProducts, this.searchList);
    this.neworderForm.patchValue({
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
    this.neworderForm.patchValue({
      searchText: ''
    });
    this.orderData[this.key].productList.splice(index, 1);
    this.tempProductList.splice(index, 1);
  }

  // Set quantity of product selected

  setQuantity(index, val) {
    this.tempProductList[index].quantity = val.target.value;
  }

  // Add product and save as draft

  add(product: object) {
    this.orderData[this.key]['productList'].push(product);
    this.saveToStorage();
  }

  // Create order

  createOrder() {}

  // Change Store

  changeStore(store) {
    this.neworderForm.value.store.StoreId = store.StoreId;
  }

  // Delete all

  deleteAll() {
    this.orderData[this.key].productList = [];
    this.tempProductList = [];
  }

  // Similar Products modal

  async presentModalSimilarProducts() {
    const modal = await this.modalController.create({
      component: SimilarProductsModalPage,
      componentProps: {
        title: 'Similar Products',
        similarProductList: this.similarProducts
      }
    });
    modal.onDidDismiss().then(data => {
      if (data.data && data.data.selectedProducts.length > 0) {
        this.tempProductList = data.data.selectedProducts;
        this.orderData[this.key].productList = data.data.selectedProducts;
        this.saveToStorage();
      }
    });
    return await modal.present();
  }

  // Order History modal

  async presentModalOrderHistory() {
    const modal = await this.modalController.create({
      component: SimilarProductsModalPage,
      componentProps: { title: 'View Order History' }
    });
    modal.onDidDismiss().then(data => {});
    return await modal.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
