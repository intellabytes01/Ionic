import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { ProductSearch } from '../store/product-search.actions';
import {
  ProductSearchState,
  ProductDetails
} from '../store/product-search.state';
import { Store, select } from '@ngrx/store';
import { productSearchData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import {
  getRegionId,
  AuthState,
  getRetailerId,
  getRetailerStoreParties
} from '@app/core/authentication/auth.states';
import { ProductSearchService } from '../product-search.service';
import { TopLoaderService } from '@app/shared/top-loader/top-loader.service';
@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.page.html',
  styleUrls: ['./product-tab.page.scss']
})
export class ProductTabPage implements OnInit, OnDestroy {
  productList: any[] = [];
  searchText = '';
  productDetails: ProductDetails;
  showList = true;
  regionId: number;
  retailerId: number;
  distributorMapping = false;
  storeList = [];
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>,
    private authStore: Store<AuthState>,
    private productSearchService: ProductSearchService,
    private topLoaderService: TopLoaderService
  ) {
    this.store.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => {}
    );
  }

  ngOnInit() {
    this.authStore.select(getRetailerId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.retailerId = state;
      },
      e => {}
    );
  }

  search() {
    this.distributorMapping = false;
    if (this.searchText.length < 3) {
      this.productList = [];
      this.productDetails = {} as ProductDetails;
    } else {
      const payload = {
        regionId: this.regionId,
        query: this.searchText,
        page: 1
      };
      if (
        !(
          this.productDetails &&
          this.searchText === this.productDetails.ProductName
        )
      ) {
        this.showList = true;
        this.store.dispatch(new ProductSearch(payload));
      }

      this.store.select(productSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.productList = state;
        },
        e => {}
      );
    }
  }

  productClick(product) {
    console.log(product);
    this.productDetails = product;
    this.searchText = product.ProductName;
    this.showList = false;
    const payload = {
      regionId: this.regionId,
      retailerId: this.retailerId,
      productId: product.id,
      query: '',
      page: 1
    };
    this.productSearchService
      .getProductDetails(payload)
      .subscribe((state: any) => {
        this.topLoaderService.norecord.next(false);
        if (state) {
          state.data.forEach(element => {
            this.storeList.push({ StoreName: element.StoreName, isMapped: false });
          });
          this.authStore
            .pipe(
              select(getRetailerStoreParties),
              untilDestroyed(this)
            )
            .subscribe(stores => {
              if (stores) {
                stores.map(element1 => {
                  // tslint:disable-next-line: align
                  // tslint:disable-next-line: prefer-for-of
                  for (let i = 0; i < state.data.length; i++) {
                    if (
                      state.data[i].StoreName.toLowerCase() ===
                      element1.StoreName.toLowerCase()
                    ) {
                      const foundIndex = this.storeList.findIndex(
                        x =>
                          x.StoreName.toLowerCase() ===
                          element1.StoreName.toLowerCase()
                      );
                      this.storeList[foundIndex] = {
                        name: element1.StoreName,
                        isMapped: true
                      };
                    }
                  }
                });
              }
            });
        }
      }),
      untilDestroyed(this);
  }

  ngOnDestroy() {}
}
