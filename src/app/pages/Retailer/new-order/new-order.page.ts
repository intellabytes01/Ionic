import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/index.js';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as fromModel from './new-order.json';
import { SimilarProductsModalPage } from './similar-products-modal/similar-products-modal.page';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductDetails, NewOrderState } from './store/new-order.state';
import { Store } from '@ngrx/store';
import { ProductSearch, NewOrderSubmit } from './store/new-order.actions';
import {
  productSearchData,
  newOrderSubmitData
} from './store/new-order.reducers';
import {
  AuthState,
  getRetailerStoreParties,
  getUserId,
  getRegionId
} from '@app/core/authentication/auth.states.js';
import { AlertService } from '@app/shared/services/alert.service.js';
import { TranslateService } from '@ngx-translate/core';

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
  userId: string;
  tabInfo: string[] = ['ORDER VIA DISTRIBUTOR', 'ORDER VIA PRODUCT'];
  activeTab: string;
  regionId: number;
  free = 0;
  grandTotal = 0;

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    public activatedRoute: ActivatedRoute,
    private store: Store<NewOrderState>,
    private authStore: Store<AuthState>,
    private alertController: AlertController,
    private router: Router,
    private alertService: AlertService,
    private translateService: TranslateService
  ) {}

  // Temp list of products is used for all operations

  setTempList() {
    this.tempProductList = Object.assign(
      this.tempProductList,
      this.orderData['productList']
    );
  }

  // Save to offline storage in draft

  saveToStorage() {
    this.orderData[this.key]['key'] = this.key;
    this.orderData[this.key]['store'] = {
      StoreId: this.neworderForm.value.store.StoreId,
      StoreName: this.neworderForm.value.store.StoreName,
      PartyCode: this.neworderForm.value.store.PartyCode
    };
    this.orderData[this.key][
      'deliveryMode'
    ] = this.neworderForm.value.deliveryMode.name;
    this.orderData[this.key][
      'deliveryPriority'
    ] = this.neworderForm.value.deliveryPriority.name;
    this.orderData[this.key]['remarks'] = this.neworderForm.value.remarks;
    this.storage.set(this.key, this.orderData[this.key]);
  }

  ngOnInit() {
    this.authStore
      .select(getRetailerStoreParties, untilDestroyed(this))
      .subscribe(
        (state: any) => {
          this.storeList = state;
        },
        e => {}
      );
    this.authStore.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
      },
      e => {}
    );
    this.authStore.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => {}
    );
    this.orderData[this.key] = {
      productList: [],
      store: {
        StoreId: null,
        StoreName: '',
        PartyCode: null
      },
      deliveryMode: '',
      deliveryPriority: '',
      remarks: '',
      total: 0
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
            this.setForm();
          }
        });
      }
    });

    this.setForm();
    this.setActiveTab(this.tabInfo[0]);
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    this.deleteAll();
    this.setForm();
  }

  setForm() {
    this.neworderForm = this.formBuilder.group({
      searchText: ['', Validators.compose([])],
      store: [
        {
          StoreId: this.orderData[this.key]
            ? this.orderData[this.key].store.StoreId
            : null,
          StoreName: this.orderData[this.key]
            ? this.orderData[this.key].store.StoreName
            : '',
          PartyCode: this.orderData[this.key]
            ? this.orderData[this.key].store.PartyCode
            : ''
        },
        Validators.compose([])
      ],
      deliveryMode: [
        {
          name: this.orderData[this.key]
            ? this.orderData[this.key]['deliveryMode']
            : ''
        },
        Validators.compose([Validators.required])
      ],
      deliveryPriority: [
        {
          name: this.orderData[this.key]
            ? this.orderData[this.key]['deliveryPriority']
            : ''
        },
        Validators.compose([Validators.required])
      ],
      remarks: [
        this.orderData[this.key] ? this.orderData[this.key]['remarks'] : '',
        Validators.compose([])
      ]
    });
  }

  // Search in Product List

  search() {
    if (this.neworderForm.value.searchText.length === 0) {
      this.searchList = [];
    } else {
      if (this.activeTab === 'ORDER VIA DISTRIBUTOR') {
        const payload = {
          query: this.neworderForm.value.searchText,
          storeId: this.neworderForm.value.store.StoreId
        };

        this.store.dispatch(new ProductSearch(payload));
      } else {
        const payload = {
          regionId: this.regionId,
          query: this.neworderForm.value.searchText,
          page: 1
        };
        this.store.dispatch(new ProductSearch(payload));
      }

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
      return element.ProductCode === product['ProductCode'];
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
    this.calculateTotal();
  }

  // Set quantity of product selected

  setQuantity(index, val, product) {
    if (product.Scheme && product.Scheme !== '') {
      let scheme = product.Scheme;
      scheme = scheme.toString().split('+');
      this.free = product.quantity / scheme[0];
      this.tempProductList[index].Free = this.free;
    }

    if (val.target.value > 0) {
      this.tempProductList[index].Quantity = val.target.value;
    } else {
      this.alertPopup(
        this.translateService.instant('NEW_ORDER.ATTENTION'),
        this.translateService.instant('NEW_ORDER.QTY_GREATER_TEXT'),
        'quantity'
      );
      this.tempProductList[index].Quantity = null;
    }
  }

  // Add product and save as draft

  add(product: ProductDetails) {
    if (product['quantity']) {
      this.orderData[this.key]['productList'].push(product);
      this.grandTotal = this.grandTotal + (product['quantity'] * product.MRP);
      this.calculateTotal();
    } else {
      this.alertService.presentToast(
        'warning',
        `${this.translateService.instant('NEW_ORDER.QTY_ENTER_TEXT')} ${product.ProductName}.`
      );
    }
  }

  // Calculate Total

  calculateTotal() {    
    this.orderData[this.key].total = 0;
    this.orderData[this.key].productList.forEach(element => {
      this.orderData[this.key].total += element.quantity * element.MRP;
    });
    this.saveToStorage();
  }

  // Change Store

  changeStore(store) {
    this.neworderForm.value.store.StoreId = store.StoreId;
    this.neworderForm.value.store.StoreName = store.StoreName;
    this.neworderForm.value.store.PartyCode = store.PartyCode;
  }

  // Change Delivery Mode

  changeDeliveryTo(deliveryMode) {
    this.neworderForm.value.deliveryMode.name = deliveryMode.name;
  }

  // Change Delivery Priority

  changeDeliveryPriority(deliveryPriority) {
    this.neworderForm.value.deliveryPriority.name = deliveryPriority.name;
  }

  // Delete all

  deleteAll() {
    if (this.orderData[this.key] && this.orderData[this.key].productList) {
      this.orderData[this.key].productList = [];
    }

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

  // Create order

  createOrder() {
    const checkInvalidQuantity = this.orderData[this.key].productList.some(
      element => {
        if (!element.quantity) {
          return true;
        }
      }
    );
    if (!checkInvalidQuantity) {
      const payload = {
        StoreId: this.neworderForm.value.store.StoreId,
        Partycode: this.neworderForm.value.store.PartyCode,
        DeliveryOption: this.neworderForm.value.deliveryMode.name,
        PriorityOption: this.neworderForm.value.deliveryPriority.name,
        Remarks: this.neworderForm.value.remarks,
        OrderTimestamp: new Date().toISOString(),
        UserId: this.userId,
        DeliveryPerson: {
          Name: '',
          Code: ''
        },
        Products: this.orderData[this.key].productList
      };
      this.store.dispatch(new NewOrderSubmit(payload));

      this.store.select(newOrderSubmitData, untilDestroyed(this)).subscribe(
        (state: any) => {
          if (state.success) {
            this.alertPopup(
              'Attention',
              this.translateService.instant('NEW_ORDER.CONFIRM_TEXT'),
              'confirm'
            );
          }
        },
        e => {}
      );
    } else {
      this.alertService.presentToast(
        'warning',
        `${this.translateService.instant('NEW_ORDER.QTY_VALID_TEXT')}`
      );
    }
  }

  // Quantity, Draft and Confirm popup

  async alertPopup(heading: string, msg: string, type: string) {
    let buttonsArray = [];
    if (type === 'draft') {
      buttonsArray = [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.saveToStorage();
          }
        }
      ];
    }
    if (type === 'confirm') {
      buttonsArray = [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            this.router.navigate(['/dashboard']);
          }
        }
      ];
    }
    if (type === 'quantity') {
      buttonsArray = [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {}
        }
      ];
    }
    const alert = await this.alertController.create({
      header: heading,
      message: msg,
      buttons: buttonsArray
    });

    await alert.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
