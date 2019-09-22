import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { untilDestroyed } from '@app/core/index.js';
import { ModalController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import * as fromModel from './new-order.json';
import { SimilarProductsModalPage } from './similar-products-modal/similar-products-modal.page';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  NewOrderState,
  newOrderGetStoreConfigData,
  productSearchData,
  newOrderSubmitData
} from './store/new-order.state';
import { Store } from '@ngrx/store';
import {
  ProductSearch,
  NewOrderSubmit,
  NewOrderStoreConfig
} from './store/new-order.actions';

import {
  AuthState,
  getRetailerStoreParties,
  getUserId,
  getRegionId,
  getRetailerId,
  mappedParties
} from '@app/core/authentication/auth.states.js';
import { AlertService } from '@app/shared/services/alert.service.js';
import { TranslateService } from '@ngx-translate/core';
import { UtilityService } from '@app/shared/services/utility.service.js';

@Component({
  selector: 'pr-new-order',
  templateUrl: './new-order.page.html',
  styleUrls: ['./new-order.page.scss']
})
export class NewOrderPage implements OnInit, OnDestroy {
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
    public translateService: TranslateService,
    private utilityService: UtilityService
  ) {
    this.key = 'Order' + '#' + new Date().toISOString();
    this.newOrderModel.Key = this.key;
  }
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
  retailerId: number;
  mappedParties: string[];
  free = 0;
  grandTotal = 0;
  sourceType = ['Mobile', 'MobilePS'];
  storeConfigInfo = [];
  storeConfigData = [];
  recentSearchedItem = '';
  showHeaderLabel = false;

  newOrderModel = {
    StoreId: [],
    Stores: [{ StoreId: null, PartyCode: null }],
    Source: this.sourceType[0],
    StoreName: null,
    Partycode: '',
    DeliveryOption: '',
    PriorityOption: '',
    Remarks: '',
    OrderTimestamp: '',
    UserId: null,
    Total: 0,
    Key: '',
    OrderFromTab: 0,
    DeliveryPerson: {
      Name: '',
      Code: ''
    },
    Products: [
      {
        StoreId: null,
        StoreName: '',
        ProductCode: '',
        DisplayProductCode: '',
        ProductName: '',
        Packing: '',
        BoxPacking: '',
        CasePacking: '',
        MRP: null,
        PTR: null,
        Company: '',
        CompanyCode: '',
        Scheme: '',
        Stock: null,
        ProductFullName: '',
        StoreSchemeId: null,
        Quantity: 0,
        Free: '',
        Added: false,
        HS: ''
      }
    ]
  };

  // checkMinMaxOrderQuantityConfig() {
  //   this.newOrderModel.Products.forEach((prod) => {
  //     this.storeConfigInfo.forEach((store) => {
  //         if (prod.StoreId === store.StoreId) {

  //         }
  //     });
  // });
  // }

  // Quantity, Draft and Confirm popup

  async;
  // Temp list of products is used for all operations

  setTempList(value) {
    this.newOrderModel = value;

    if (this.newOrderModel.OrderFromTab === 0) {
      this.activeTab = this.tabInfo[0];
    } else {
      this.activeTab = this.tabInfo[1];
    }
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
        () => {}
      );
    this.authStore.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
        this.newOrderModel.UserId = state;
      },
      () => {}
    );
    this.authStore.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      () => {}
    );

    this.authStore.select(getRetailerId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.retailerId = state;
      },
      () => {}
    );

    this.authStore.select(mappedParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.mappedParties = state;
      },
      () => {}
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
        this.storage.forEach((value, key) => {
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

    const payload = {
      retailerId: this.retailerId
    };
    this.store.dispatch(new NewOrderStoreConfig(payload));

    this.store
      .select(newOrderGetStoreConfigData, untilDestroyed(this))
      .subscribe(
        (state: any) => {
          if (state && state.length > 0) {
            this.storeConfigInfo = state;
          }
        },
        () => {}
      );
  }

  setActiveTab(tab) {
    this.activeTab = tab;
    if (tab === 'ORDER VIA PRODUCT') {
      this.newOrderModel.OrderFromTab = 1;
      this.newOrderModel.Source = this.sourceType[1];
    } else {
      this.newOrderModel.OrderFromTab = 0;
    }
    this.deleteAll();
    this.setForm();
    this.showHeaderLabel = false;
  }

  setForm() {
    this.neworderForm = this.formBuilder.group({
      searchText: ['', Validators.compose([])],
      store: [
        {
          StoreId: this.orderData[this.key]
            ? this.orderData[this.key].store.StoreId
            : [],
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
      this.clearSearchInput();
    } else {
      if (this.activeTab === 'ORDER VIA DISTRIBUTOR') {
        const payload = {
          query: this.neworderForm.value.searchText,
          storeId: this.newOrderModel.StoreId[0]
        };

        this.store.dispatch(new ProductSearch(payload));
      } else {
        const payload = {
          retailerId: this.retailerId,
          query: this.neworderForm.value.searchText
        };
        this.store.dispatch(new ProductSearch(payload));
      }

      this.store.select(productSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.searchList = state;
        },
        () => {}
      );
    }
  }

  // Select Product from search list

  selectProduct(product) {
    this.clearSearchInput();
    this.recentSearchedItem = product.ProductName;
    this.similarProducts = Object.assign(this.similarProducts, this.searchList);
    this.neworderForm.patchValue({
      searchText: product.ProductName
    });

    this.storeConfigData =
      this.utilityService.checkNull(this.storeConfigInfo) !== 'null'
        ? this.utilityService.isJSON(this.storeConfigInfo)
        : [];
    this.storeConfigData = this.storeConfigInfo[product.StoreId];

    this.searchList = [];

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
    this.newOrderModel.Products.splice(index, 1);

    if (this.newOrderModel.Products.length === 0) {
      this.showHeaderLabel = false;
    }
    // this.tempProductList.splice(index, 1);
    this.calculateTotal();
  }

  // Set Quantity of product selected

  setQuantity(index, val, product) {
    if (
      this.utilityService.checkNull(product.Quantity) !== 'null' &&
      product.Quantity > 0 &&
      this.storeConfigData['RetailerSchemePreference'] === 1
    ) {
      product.Free = this.setScheme(product);
      if (
        this.utilityService.checkNull(product.Free) === 'null' ||
        product.Free <= 0
      ) {
        product.HS = this.displayHalfScheme(product.Quantity, product);
        // $("#pHalfScheme").html(HS);
      } else {
        product.HS = '';
        // $("#pHalfScheme").html("");
      }
    } else {
      product.HS = '';
      // $("#pHalfScheme").html("");
      // $("#pSchemeValue").text("");
    }

    if (product['Added']) {
      this.addProduct(product);
    }

    // if (product.Scheme && product.Scheme !== '') {
    //   let scheme = product.Scheme;
    //   scheme = scheme.toString().split('+');
    //   if (product.Quantity != null && product.Quantity !== '') {
    //     this.free = product.Quantity / scheme[0];
    //   }

    //   this.newOrderModel.Products[index].Free = this.free.toString();
    // }

    if (val.target.value >= 0) {
      this.newOrderModel.Products[index].Quantity = val.target.value;
    } else if (val.target.value == '' || val.target.value == null) {
      val.target.value = 0;
      this.newOrderModel.Products[index].Quantity = val.target.value;
    } else {
      this.alertPopup(
        this.translateService.instant('NEW_ORDER.ATTENTION'),
        this.translateService.instant('NEW_ORDER.QTY_GREATER_TEXT'),
        'Quantity'
      );

      this.newOrderModel.Products[index].Quantity = 0;
    }
  }

  displayHalfScheme(EnteredQty, displaystoreproduct) {
    const storeConfig = this.storeConfigData;
    let HS = '';
    if (this.utilityService.checkNull(storeConfig) !== 'null') {
      if (
        storeConfig['DisplayHalfScheme'] === '1' ||
        storeConfig['DisplayHalfScheme'] === 1
      ) {
        const AllSchemes = displaystoreproduct.Scheme;
        if (this.utilityService.checkNull(AllSchemes) !== 'null') {
          const Scheme = AllSchemes.split(',');
          // tslint:disable-next-line: radix
          EnteredQty = parseInt(EnteredQty);
          if (this.utilityService.checkNull(Scheme) !== 'null') {
            if (Scheme.length === 1) {
              const schemeunits = Scheme[0].split('+');
              if (schemeunits.length > 1) {
                // tslint:disable-next-line: radix
                let forqty = parseInt(schemeunits[0]);
                // tslint:disable-next-line: radix
                const freeqty = parseInt(schemeunits[1]);
                forqty = forqty / 2;
                if (
                  (storeConfig['DisplayHalfSchemeOn'] === 'gte' &&
                    EnteredQty >= forqty) ||
                  (storeConfig['DisplayHalfSchemeOn'] === 'gt' &&
                    EnteredQty > forqty)
                ) {
                  if (
                    (storeConfig['RoundOffDisplayHalfScheme'] === 'true' ||
                      storeConfig['RoundOffDisplayHalfScheme'] === true) &&
                    freeqty % 2 === 1
                  ) {
                    if (EnteredQty === forqty) {
                      HS =
                        EnteredQty +
                        0.5 +
                        ' + ' +
                        parseFloat(schemeunits[1]) / 2;
                    } else {
                      HS =
                        EnteredQty -
                        0.5 +
                        ' + ' +
                        parseFloat(schemeunits[1]) / 2;
                    }
                  } else {
                    HS = EnteredQty + ' + ' + parseFloat(schemeunits[1]) / 2;
                  }
                }
              }
            } else {
              let schemetouseid = -1;
              let maxvalue = 0;
              for (let i = 0; i < Scheme.length; i++) {
                const schemeunits = Scheme[i].split('+');
                if (schemeunits.length > 1) {
                  // tslint:disable-next-line: radix
                  let forqty = parseInt(schemeunits[0], 10);
                  forqty = forqty / 2;
                  if (
                    (storeConfig['DisplayHalfSchemeOn'] === 'gte' &&
                      EnteredQty >= forqty &&
                      forqty > maxvalue) ||
                    (storeConfig['DisplayHalfSchemeOn'] === 'gt' &&
                      EnteredQty > forqty &&
                      forqty > maxvalue)
                  ) {
                    schemetouseid = i;
                    maxvalue = forqty;
                  }
                }
              }
              if (schemetouseid > -1) {
                const schemeunits = Scheme[schemetouseid].split('+');
                if (schemeunits.length > 1) {
                  // tslint:disable-next-line: radix
                  let forqty = parseInt(schemeunits[0], 10);
                  // tslint:disable-next-line: radix
                  const freeqty = parseInt(schemeunits[1], 10);
                  forqty = forqty / 2;
                  if (
                    (storeConfig['RoundOffDisplayHalfScheme'] === '1' ||
                      storeConfig['RoundOffDisplayHalfScheme'] === 1) &&
                    freeqty % 2 === 1
                  ) {
                    if (EnteredQty === forqty) {
                      HS = EnteredQty + 0.5 + ' + ' + (freeqty / 2).toFixed(2);
                    } else {
                      HS = EnteredQty - 0.5 + ' + ' + (freeqty / 2).toFixed(2);
                    }
                  } else {
                    HS = EnteredQty + ' + ' + (freeqty / 2).toFixed(2);
                  }
                }
              }
            }
          }
          return HS;
        }
        return HS;
      }
    }
  }

  setScheme(displaystoreproduct) {
    if (displaystoreproduct != null) {
      // $("#pSchemeValue").text("");
      // var displaystoreproduct = JSON.parse(window.localStorage["DisplayStoreProduct"]);
      const schemevalue = displaystoreproduct.Scheme;

      if (schemevalue != null) {
        const schemes = schemevalue.split(',');
        if (schemes.length === 1) {
          const schemeunits = schemes[0].split('+');
          // $('#pSchemeValue').text('');
          let qty = displaystoreproduct.Quantity;
          if (this.utilityService.checkNull(qty) === 'null') {
            qty = 0;
          }
          if (!isNaN(qty)) {
            let quantity = null;
            if (qty <= 0) {
              quantity = 0;
            } else {
              quantity = displaystoreproduct.Quantity;
            }
            if (schemeunits.length > 1) {
              const forqty = parseInt(schemeunits[0], 10);
              const freeqty = parseInt(schemeunits[1], 10);
              let scheme = 0;
              if (forqty > 0 && freeqty > 0 && quantity >= forqty) {
                scheme = Math.floor(quantity / forqty) * freeqty;
              }
              return scheme;
            }
          } else {
            return 0;
          }
        } else {
          let schemetouseid = -1;
          let maxvalue = 0;
          let maxfreevalue = 0;
          if (!isNaN(displaystoreproduct.Quantity)) {
            const quantity = parseInt(displaystoreproduct.Quantity, 10);
            for (let i = 0; i < schemes.length; i++) {
              const schemeunits = schemes[i].split('+');
              if (schemeunits.length > 1) {
                let forqty = 0;
                forqty = parseInt(schemeunits[0], 10);
                const freeqty = parseInt(schemeunits[1], 10);
                if (quantity >= forqty && forqty > maxvalue) {
                  schemetouseid = i;
                  maxvalue = forqty;
                  maxfreevalue = freeqty;
                }
              }
            }

            if (schemetouseid > -1) {
              const schemeunits = schemes[schemetouseid].split('+');
              if (schemeunits.length > 1) {
                const forqty = parseInt(schemeunits[0], 10);
                const freeqty = parseInt(schemeunits[1], 10);
                let scheme = 0;
                if (forqty > 0 && freeqty > 0) {
                  scheme = Math.floor(quantity / forqty) * freeqty;
                }
                return scheme;
              }
            }
          } else {
            return 0;
          }
        }
      }
    }
  }

  // Add product and save as draft

  addProduct(displaystoreproduct) {
    let confirmPO = true;
    let qvalu = displaystoreproduct.Quantity;
    let qvaluQty = 0;
    let qvaluFree = 0;
    if (displaystoreproduct['Quantity']) {
      if (this.utilityService.checkNull(this.storeConfigData) !== 'null') {
        if (this.storeConfigData['RetailerSchemePreference'] === 1) {
          const FreeQty = displaystoreproduct.Free;
          if (
            !FreeQty ||
            this.utilityService.checkNull(FreeQty) === '' ||
            FreeQty <= 0
          ) {
            qvaluQty = this.getHSQty(qvalu, displaystoreproduct);
            qvaluQty =
              qvaluQty <= 0 ||
              this.utilityService.checkNull(qvaluQty) === 'null'
                ? qvalu
                : qvaluQty;
            qvaluFree = this.getHSFree(qvalu, displaystoreproduct);
            // tslint:disable-next-line: variable-name
            const qvalu_temp = this.setQtyForHS(qvalu, displaystoreproduct);
            if (
              this.utilityService.checkNull(qvalu_temp) !== 'null' &&
              qvalu_temp > 0
            ) {
              qvalu = qvalu_temp <= 0 ? qvalu : qvalu_temp;
            }
          } else {
          }
        }
      }

      if (displaystoreproduct == null) {
        this.alertService.presentToast('warning', 'Please select a product.');
        return;
      }
      if (isNaN(qvalu) || qvalu <= 0 || qvalu.length > 5) {
        if (qvalu.length > 5) {
          this.alertService.presentToast(
            'warning',
            'Quantity should be less than or equal to 5 digits'
          );
        } else if (Number(qvalu) === 0) {
          this.alertService.presentToast(
            'warning',
            'Quantity must be greater than zero.'
          );
        } else {
          this.alertService.presentToast(
            'warning',
            'Please add valid quantity.'
          );
        }
        return;
      }
      // const numericExp = /^[0-9]+$|^$/;
      // if (!numericExp.test(qvalu)) {
      //   this.alertService.presentToast(
      //     "warning",
      //     "Please enter valid number for quantity."
      //   );
      //   return;
      // }

      const freeQty = displaystoreproduct.Free ? displaystoreproduct.Free : 0;
      const qtyPLUSfree =
        this.utilityService.checkNull(freeQty) === 'null'
          ? Number(qvalu)
          : // tslint:disable-next-line: radix
            Number(parseInt(freeQty) + parseInt(qvalu));
      confirmPO = this.checkMinMaxOrderQuantity(
        confirmPO,
        displaystoreproduct.AllowMOQ,
        qtyPLUSfree,
        displaystoreproduct.AllowMinQty,
        displaystoreproduct.AllowMaxQty,
        displaystoreproduct.StepUpValue
      );
      // let poAmount = $('#pApproxPOAmount').text().replace(',', '');

      this.grandTotal = Math.round(
        this.grandTotal +
          displaystoreproduct['Quantity'] * displaystoreproduct.PTR
      );

      displaystoreproduct['HSQty'] = qvaluQty;
      displaystoreproduct['HSFree'] = qvaluFree;

      confirmPO = this.checkminmaxlimitProductwise(
        this.newOrderModel.Products,
        'max'
      );

      if (confirmPO === true) {
        confirmPO = this.checkglobalmaxlimit(confirmPO, this.grandTotal);
      }

      if (confirmPO) {
        this.newOrderModel.Products.forEach(element => {
          if (element['Added']) {
            if (element['ProductCode'] === displaystoreproduct['ProductCode']) {
              this.alertService.presentToast(
                'warning',
                'Product already added.'
              );
            }
          } else {
            displaystoreproduct['Added'] = true;
            this.calculateTotal();
            
          }
        });
      }

      // if(confirmPO === true) {
      //   displaystoreproduct['Added'] = true;
      //   this.grandTotal = Math.round(
      //   this.grandTotal + displaystoreproduct['Quantity'] * displaystoreproduct.PTR
      //   );
      //   this.calculateTotal();
      // }
    }

    // if (product['Quantity']) {
    //   product['Added'] = true;
    //   this.grandTotal = Math.round(
    //     this.grandTotal + product['Quantity'] * product.PTR
    //   );
    //   this.calculateTotal();
    // } else {
    //   this.alertService.presentToast(
    //     'warning',
    //     `${this.translateService.instant('NEW_ORDER.QTY_ENTER_TEXT')} ${
    //       product.ProductName
    //     }.`
    //   );
    // }
    this.showHeaderLabelForAddedProduct();
    this.neworderForm.patchValue({
      searchText: ''
    });
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
    });

    this.newOrderModel.Total = Number(totalValue.toFixed(2));
    this.saveToStorage();
  }

  // Change Store

  changeStore(store) {
    this.newOrderModel.StoreId.push(store.StoreId);
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

    this.newOrderModel.Partycode = '';
    (this.newOrderModel.DeliveryOption = ''),
      (this.newOrderModel.PriorityOption = '');
    this.newOrderModel.Remarks = '';
    this.newOrderModel.OrderTimestamp = '';
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
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  // Create order

  createOrder() {
    const checkInvalidQuantity = this.newOrderModel.Products.some(element => {
      if (!element.Quantity) {
        return true;
      }
    });
    this.newOrderModel.Products.forEach(element => {
      if (!element['Added']) {
        this.alertPopup('Error', 'Please add all items', 'confirm');
        return;
      }
    });

    let confirmPO = true;

    confirmPO = this.checkminmaxlimitProductwise(
      this.newOrderModel.Products,
      'min'
    );
    if (confirmPO === true) {
      confirmPO = this.checkminmaxlimitProductwise(
        this.newOrderModel.Products,
        'max'
      );
    }
    if (confirmPO === true) {
      if (!checkInvalidQuantity) {
        const arrayStoreId = [];
        const arrayStoreIdParty = [];
        this.newOrderModel.Products.forEach(product => {
          arrayStoreId.includes(product.StoreId)
            ? null
            : arrayStoreId.push(product.StoreId);
        });

        arrayStoreId.forEach(store => {
          this.mappedParties.forEach(party => {
            if (store == party['StoreId']) {
              const index = arrayStoreIdParty.findIndex(
                x => x['PartyCode'] === party['PartyCode']
              );
              if (index === -1) {
                arrayStoreIdParty.push({
                  StoreId: party['StoreId'],
                  PartyCode: party['PartyCode']
                });
              }
            }
            // storeArray.includes(party['PartyCode']) ? null : storeArray.push(product.StoreId);
          });
        });

        this.newOrderModel.Stores = arrayStoreIdParty;

        const payload = {
          Stores: this.newOrderModel.Stores,
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
          Source: this.newOrderModel.Source,
          Products: this.newOrderModel.Products
        };
        this.store.dispatch(new NewOrderSubmit(payload));

        // this.saveToStorage();

        this.store.select(newOrderSubmitData, untilDestroyed(this)).subscribe(
          (state: any) => {
            if (state.success) {
              this.deleteAll();
              this.alertPopup(
                'Attention',
                this.translateService.instant('NEW_ORDER.CONFIRM_TEXT'),
                'confirm'
              );
            }
          },
          () => {}
        );
      } else {
        this.alertService.presentToast(
          'warning',
          `${this.translateService.instant('NEW_ORDER.QTY_VALID_TEXT')}`
        );
      }
    }
  }

  // tslint:disable-next-line: variable-name
  checkminmaxlimitProductwise(cart, min_max) {
    const cartGroupByStore = this.utilityService.groupBy(cart);
    let cartGroupByStoreArray = [];
    cartGroupByStoreArray = this.utilityService.mergeObjects(
      cartGroupByStore,
      'id'
    );
    // tslint:disable-next-line: prefer-for-of

    cartGroupByStoreArray.forEach((item, index) => {
      // });

      // for (let i = 0; i < cartGroupByStoreArray.length; i++) {
      // const row = item;
      let totalStoreWise = 0;
      let amountStoreWise = 0;

      // row.forEach(item => {
      const stock = item[index].Stock;
      if (stock > 0) {
        amountStoreWise += Number(
          item[index].PTR *
            (item[index].HSFree === 0
              ? item[index].Quantity
              : item[index].HSQty)
        );
        totalStoreWise++;
      }
      // });
      item[index].totalAmount = amountStoreWise;
      item[index].totalItem = totalStoreWise;
      item[index].storeId = item[index].StoreId;
      if (min_max === 'min') {
        item[index].status = this.checkminlimit(
          totalStoreWise,
          amountStoreWise,
          item[index].StoreId,
          item[index].id
        );
      } else if (min_max === 'max') {
        item[index].status = this.checkmaxlimit(
          totalStoreWise,
          amountStoreWise,
          item[index].StoreId,
          item[index].id
        );
      }
    });
    let confirmOrder = true;
    cartGroupByStoreArray.forEach((item, index) => {
      // for (let i = 0; i < cartGroupByStoreArray.length; i++) {
      if (item[index].status === false || item[index].status === 'false') {
        confirmOrder = false;
        return false;
      }
    });
    return confirmOrder;
  }

  checkmaxlimit(itemCount, poAmount, storeId, storeName) {
    let confirmPO = 'true';
    // var flag = "";
    /*flag =
     0 = confirmPO
     1 = item error
     2 = amount error
     */
    this.storeConfigInfo.forEach(item => {
      if (storeId === item.StoreId) {
        if (item.MaxItemLimit != null && item.MaxItemLimit !== undefined) {
          if (item.MaxItemLimit !== 0) {
            if (itemCount > item.MaxItemLimit) {
              this.alertService.presentToast(
                'warning',
                'You can order maximum ' +
                  item.MaxItemLimit +
                  ' items per order for ' +
                  storeName +
                  '. To add more, plz confirm this order and place' +
                  'a new order for remaining items.'
              );
              confirmPO = 'false';
              return;
            }
          }
        }
        if (item.MaxAmountLimit != null && item.MaxAmountLimit !== undefined) {
          if (item.MaxAmountLimit !== 0) {
            if (poAmount > item.MaxAmountLimit) {
              this.alertService.presentToast(
                'warning',
                'Your per order amount limit is set to Rs ' +
                  item.MaxAmountLimit +
                  ' for ' +
                  storeName +
                  '. Kindly request your distributor to increase the limit.'
              );
              confirmPO = 'false';
              return;
            }
          }
        }
      }
    });
    return confirmPO;
  }

  checkminlimit(itemCount, poAmount, storeId, storeName) {
    let confirmPO = 'true';
    let flag = -1;
    /*flag =
     0 = confirmPO
     1 = item error
     2 = amount error
     */
    // $.each(dr_StoreParties, function(index, item) {
    this.storeConfigInfo.forEach(item => {
      if (storeId === item.StoreId) {
        if (item.MinItemLimit != null || item.MinItemLimit !== undefined) {
          // itemCount++;
          if (item.MinItemLimit !== 0) {
            if (itemCount < item.MinItemLimit) {
              confirmPO = 'false';
              flag = 1;
              // return;
            } else {
              flag = 0;
            }
          }
        }

        if (flag !== 1) {
          const showPTR = this.checkHiddenPTR();
          if (showPTR) {
            if (
              item.MinAmountLimit != null ||
              item.MinAmountLimit !== undefined
            ) {
              if (item.MinItemLimit !== 0) {
                if (poAmount < item.MinAmountLimit) {
                  confirmPO = 'false';
                  if (flag !== 0) {
                    if (flag !== 1) {
                      flag = 2;
                    }
                  } else {
                    flag = 2;
                  }
                } else {
                  flag = 0;
                }
              }
            }
          } else {
            if (flag !== 0) {
              if (flag !== 1) {
                flag = 2;
              }
            }
            if (!showPTR) {
              if (flag !== 1) {
                flag = 0;
              }
            }
          }
        }
        if (flag === 0 || flag === 1 || flag === 2) {
          if (flag === 0) {
            confirmPO = 'true';
          } else {
            if (flag === 1) {
              this.alertService.presentToast(
                'warning',
                'You should order minimum ' +
                  item.MinItemLimit +
                  ' items with stock for ' +
                  storeName +
                  '. Kindly add more items with stock to proceed with ' +
                  'this order or request your distributor to decrease minimum item order limit.'
              );
            } else if (flag === 2) {
              this.alertService.presentToast(
                'warning',
                'Your minimum order amount limit for products with stock is set to Rs ' +
                  item.MinAmountLimit +
                  ' for ' +
                  storeName +
                  '. Your current order amount for products with stock is Rs ' +
                  poAmount.toFixed(2) +
                  '. Kindly add more items to proceed with this order or request your ' +
                  'distributor to decrease the limit.'
              );
            }
          }
        }
      }
    });
    return confirmPO;
  }

  checkHiddenPTR() {
    let Cart = window.localStorage['Cart'];
    Cart =
      this.utilityService.checkReturnValue(Cart, 'null') === 'null'
        ? 'null'
        : this.utilityService.isJSON(Cart);
    let flag = true;
    if (Cart !== 'null' && Cart.length > 0) {
      this.newOrderModel.Products.forEach(element => {
        if (element['DisplayStoreProduct']['ShowPTR'] === false) {
          flag = false;
          return false;
        }
      });
    }
    return flag;
  }

  showHeaderLabelForAddedProduct() {
    if (!this.showHeaderLabel) {
      this.newOrderModel.Products.forEach(element => {
        if (element['Added']) {
          this.showHeaderLabel = true;
          return true;
        }
      });
    }
  }

  clearSearchInput() {
    this.newOrderModel.Products.forEach((element, index) => {
      if (!element['Added']) {
        this.newOrderModel.Products.splice(index, 1);
        this.neworderForm.patchValue({
          searchText: ''
        });
      }
    });
  }

  checkglobalmaxlimit(confirmPO, poAmount) {
    const UserDetails = {};
    if (
      this.utilityService.checkNull(UserDetails['UseMaxCartValue']) !== 'null'
    ) {
      if (UserDetails['UseMaxCartValue'] === true) {
        if (poAmount >= UserDetails['MaxCartValue']) {
          confirmPO = confirmPO === 'true' ? 'false' : 'false';
        } else {
          confirmPO = confirmPO === 'true' ? 'true' : 'true';
        }
      }
    } else {
      if (confirmPO === 'false') {
        this.alertService.presentToast(
          'warning',
          'Order amount exceeded, max limit ' + UserDetails['MaxCartValue']
        );
      }
      return confirmPO;
    }
    if (confirmPO === 'false') {
      this.alertService.presentToast(
        'warning',
        'Order amount exceeded, max limit ' + UserDetails['MaxCartValue']
      );
    }
    return confirmPO;
  }

  checkMinMaxOrderQuantity(confirmPO, allowMOQ, qty, minQty, maxQty, stepUp) {
    if (allowMOQ === true) {
      const orgMinQty = minQty;
      stepUp =
        this.utilityService.checkNull(stepUp) === 'null' || stepUp === 0
          ? 1
          : stepUp;
      minQty =
        this.utilityService.checkNull(minQty) === 'null' || minQty === 0
          ? 1
          : minQty;
      maxQty =
        this.utilityService.checkNull(maxQty) === 'null' || maxQty === 0
          ? 99999
          : maxQty;
      if (
        this.utilityService.checkNull(orgMinQty) === 'null' ||
        orgMinQty === 0
      ) {
        if (qty < minQty) {
          this.alertService.presentToast(
            'warning',
            'This item has a minimum purchase quantity ' + minQty
          );
          confirmPO = 'false';
        } else if (qty > maxQty) {
          this.alertService.presentToast(
            'warning',
            'This item has a limited purchase quantity ' + maxQty
          );
          confirmPO = 'false';
        } else if (qty >= minQty && qty <= maxQty) {
          confirmPO = 'true';
        }
      } else if (
        this.utilityService.checkNull(qty) !== 'null' &&
        minQty > 0 &&
        maxQty > 0
      ) {
        if (qty < minQty) {
          this.alertService.presentToast(
            'warning',
            'This item has a minimum purchase quantity ' + minQty
          );
          confirmPO = 'false';
        } else if (qty > maxQty) {
          this.alertService.presentToast(
            'warning',
            'This item has a limited purchase quantity ' + maxQty
          );
          confirmPO = 'false';
        } else if ((qty - minQty) % stepUp === 0) {
          confirmPO = 'true';
        } else {
          confirmPO = 'false';
        }
      }
    }
    return confirmPO;
  }

  roundUp(numberRound, modulus, minQty, maxQty) {
    const remainder = (numberRound - minQty) % modulus;
    if (remainder === 0) {
      return numberRound;
    } else {
      let qtyMax = 0;
      let qtyMin = 0;
      qtyMax = numberRound + (modulus - remainder);
      if (minQty > 0 && maxQty > 0 && modulus > 0) {
        // 6, 8 ==> 3
        // Where setup is greater than difference if min and max
        if (Number(maxQty - minQty) < modulus) {
          qtyMin = minQty;
          this.alertService.presentToast(
            'danger',
            `This item can only be bought in quantity such as ${qtyMin}.`
          );
          return qtyMax;
        } else {
          if (qtyMax > maxQty) {
            qtyMax -= modulus;
          }
          qtyMin = Number(qtyMax - modulus);
          if (qtyMin < minQty) {
            qtyMin = qtyMax;
          }
          this.alertService.presentToast(
            'danger',
            'This item can only be bought in multiples of' +
              modulus +
              ' such as (' +
              qtyMin +
              ', ' +
              qtyMax +
              ')'
          );
          return qtyMax;
        }
      }
    }
  }

  setQtyForHS(qvalu, displaystoreproduct) {
    if (
      this.storeConfigData['RoundOffDisplayHS'] === 'true' ||
      this.storeConfigData['RoundOffDisplayHS'] === true
    ) {
      const pHalfScheme = this.displayHalfScheme(qvalu, displaystoreproduct);
      if (this.utilityService.checkNull(pHalfScheme) !== 'null') {
        const halfScheme = pHalfScheme.split('+');
        const halfSchemeQty = parseFloat(halfScheme[0]);
        const halfSchemeFree = parseFloat(halfScheme[1]);
        return halfSchemeQty + halfSchemeFree;
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }

  getHSQty(qvalu, displaystoreproduct) {
    const pHalfScheme = this.displayHalfScheme(qvalu, displaystoreproduct);
    if (this.utilityService.checkNull(pHalfScheme) !== 'null') {
      const halfScheme = pHalfScheme.split('+');
      const halfSchemeQty = parseFloat(halfScheme[0]);
      return halfSchemeQty;
    } else {
      return 0;
    }
  }

  getHSFree(qvalu, displaystoreproduct) {
    const pHalfScheme = this.displayHalfScheme(qvalu, displaystoreproduct);
    if (this.utilityService.checkNull(pHalfScheme) !== 'null') {
      const halfScheme = pHalfScheme.split('+');
      const halfSchemeFree = parseFloat(halfScheme[1]);
      return halfSchemeFree;
    } else {
      return 0;
    }
  }

  // tslint:disable-next-line: align
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
