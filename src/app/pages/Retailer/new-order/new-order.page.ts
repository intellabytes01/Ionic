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
import { NewOrderState } from './store/new-order.state';
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

  newOrderModel = {
    "StoreId": null,
    "StoreName": null,
    "Partycode": "",
    "DeliveryOption": "",
    "PriorityOption": "",
    "Remarks": "",
    "OrderTimestamp": "",
    "UserId": null,
    "Total": 0,
    "Key": '',
    "DeliveryPerson": {
      "Name": "",
      "Code": ""
    },
    "Products": [
      {
        "StoreId": null,
        "StoreName": "",
        "ProductCode": "",
        "DisplayProductCode": "",
        "ProductName": "",
        "Packing": "",
        "BoxPacking": "",
        "CasePacking": "",
        "MRP": null,
        "PTR": null,
        "Company": "",
        "CompanyCode": "",
        "Scheme": "",
        "Stock": null,
        "ProductFullName": "",
        "StoreSchemeId": null,
        "Quantity": 0,
        "Free": "",
        "Added": false
      }
    ]
  }

  constructor(
    private storage: Storage,
    public formBuilder: FormBuilder,
    private modalController: ModalController,
    public activatedRoute: ActivatedRoute,
    private store: Store<NewOrderState>,
    private authStore: Store<AuthState>,
    private alertController: AlertController,
    private router: Router,
    private alertService: AlertService,
    public translateService: TranslateService
  ) {
    this.key = 'Order' + '#' + new Date().toISOString();
    this.newOrderModel.Key = this.key;
  }

  // Temp list of products is used for all operations

  setTempList(value) {
    this.newOrderModel = value;
  }
  // Save to offline storage in draft

  saveToStorage() {
    this.storage.set(this.key, this.newOrderModel);
  }

  ngOnInit() {
    this.authStore
      .select(getRetailerStoreParties, untilDestroyed(this))
      .subscribe(
        (state: any) => {
          this.storeList = state;
        },
        e => { }
      );
    this.authStore.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
        this.newOrderModel.UserId = state;
      },
      e => { }
    );
    this.authStore.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => { }
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
            // this.orderData = value;
            this.setTempList(value);
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
          storeId: this.newOrderModel.StoreId
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
        e => { }
      );
    }
  }

  // Select Product from search list

  selectProduct(product) {
    this.similarProducts = Object.assign(this.similarProducts, this.searchList);
    this.neworderForm.patchValue({
      searchText: ''
    });

    const productPresent = this.newOrderModel.Products.find(element => {
      return element.ProductCode === product['ProductCode'];
    });

    if (!productPresent) {
      this.newOrderModel.Products.push(product);
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

  // Set Quantity of product selected

  setQuantity(index, val, product) {
    if (product.Scheme && product.Scheme !== '') {
      let scheme = product.Scheme;
      scheme = scheme.toString().split('+');
      this.free = product.Quantity / scheme[0];

      this.newOrderModel.Products[index].Free = this.free.toString();
    }

    if (val.target.value > 0) {
      this.newOrderModel.Products[index].Quantity = val.target.value;
    } else {
      this.alertPopup(
        this.translateService.instant('NEW_ORDER.ATTENTION'),
        this.translateService.instant('NEW_ORDER.QTY_GREATER_TEXT'),
        'Quantity'
      );

      this.newOrderModel.Products[index].Quantity = null;
    }
  }

  // Add product and save as draft

  add(product) {
    if (product['Quantity']) {

      product['Added'] = true;
      this.grandTotal = Math.round(this.grandTotal + (product['Quantity'] * product.PTR));
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
    this.newOrderModel.Total = 0;
    // this.orderData[this.key].total = 0;

    let totalValue = 0;

    this.newOrderModel.Products.forEach(element => {
      if (element['Added']) {
        totalValue += element.Quantity * element.PTR;
      }
    })

    this.newOrderModel.Total = Number(totalValue.toFixed(2));
    this.saveToStorage();
  }

  // Change Store

  changeStore(store) {

    this.newOrderModel.StoreId = store.StoreId;
    this.newOrderModel.StoreName = store.StoreName;
    this.newOrderModel.Partycode = store.PartyCode;
  }

  // Change Delivery Mode

  changeDeliveryTo(deliveryMode) {
    this.newOrderModel.DeliveryOption = deliveryMode.name;
  }

  // Change Delivery Priority

  changeDeliveryPriority(deliveryPriority) {
    this.newOrderModel.PriorityOption = deliveryPriority.name;
  }

  // Delete all

  deleteAll() {
    if (this.orderData[this.key] && this.orderData[this.key].productList) {
      this.orderData[this.key].productList = [];
    }
    this.newOrderModel.Products = [];
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
    modal.onDidDismiss().then(data => { });
    return await modal.present();
  }

  // Create order

  createOrder() {
    const checkInvalidQuantity = this.newOrderModel.Products.some(
      element => {
        if (!element.Quantity) {
          return true;
        }
      }
    );
    this.newOrderModel.Products.forEach(element => {
      if (!element['Added']) {
        this.alertPopup('Error', 'Please add all items', 'confirm');
        return;
      }
    });

    if (!checkInvalidQuantity) {
      const payload = {
        StoreId: this.newOrderModel.StoreId,
        PartyCode: this.newOrderModel.Partycode,
        DeliveryOption: this.newOrderModel.DeliveryOption,
        PriorityOption: this.newOrderModel.PriorityOption,
        Remarks: this.newOrderModel.Remarks,
        OrderTimestamp: this.newOrderModel.OrderTimestamp,
        UserId: this.newOrderModel.UserId,
        DeliveryPerson: {
          Name: '',
          Code: ''
        },
        Products: this.newOrderModel.Products
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
        e => { }
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
          handler: () => { }
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
          handler: () => { }
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
