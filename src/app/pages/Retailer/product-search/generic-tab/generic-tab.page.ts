import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { GenericSearch, GenericDetail, GenericStores } from '../store/product-search.actions';
import {
  ProductSearchState,
  GenericDetails
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { genericSearchData, genericDetailData, genericStoresData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';
import { getRetailerId, AuthState, getRegionId } from '@app/core/authentication/auth.states';
import { TopLoaderService } from '@app/shared/top-loader/top-loader.service';

@Component({
  selector: 'app-generic-tab',
  templateUrl: './generic-tab.page.html',
  styleUrls: ['./generic-tab.page.scss'],
})
export class GenericTabPage implements OnInit {

  genericList: any[] = [];
  genericProductList: any[] = [];
  genericStoresList: any[] = [];
  searchText = '';
  genericDetails: GenericDetails;
  showList = true;
  subListShow: any[] = [];
  retailerId: number;
  regionId: number;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>,
    private authStore: Store<AuthState>,
    private topLoaderService: TopLoaderService
  ) { }

  ngOnInit() {
    this.authStore.select(getRetailerId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.retailerId = state;
      },
      e => { }
    );
    this.authStore.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => {}
    );
  }

  search() {
    if (this.searchText.length < 3) {
      this.genericList = [];
      this.genericProductList = [];
      this.genericDetails = {} as GenericDetails;
    } else {
      const payload = {
        query: this.searchText,
        page: 1
      };
      if (
        !(this.genericDetails &&
          this.searchText === this.genericDetails.NAME)
      ) {
        this.showList = true;
        this.store.dispatch(new GenericSearch(payload));
      }

      this.store.select(genericSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.genericList = state;
        },
        e => { }
      );
    }
  }

  productClick(product) {
    this.genericDetails = product;
    this.searchText = product.NAME;
    this.showList = false;
    this.genericProductList = [];
    const payload = {
      GenericId: product.GenericId
    };
    this.store.dispatch(new GenericDetail(payload));
    this.store.select(genericDetailData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.genericProductList = state;
      },
      e => { }
    );
  }

  getStores(product, i) {
    this.toggle(i);
    const payloadStores = {
      productId: product.ProductId,
      retailerId: this.retailerId,
      regionId: this.regionId,
      page: 1
    };
    this.store.dispatch(new GenericStores(payloadStores));
    this.store.select(genericStoresData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.genericStoresList = state;
        this.topLoaderService.norecord.next(false);
        this.scrollTo(product.ProductId);
      },
      e => { }
    );
  }

  // For sublist
  toggle(index) {
    if (this.subListShow[index] === undefined) {
      this.subListShow[index] = false;
    }
    this.subListShow[index] = !this.subListShow[index];
    this.subListShow = this.subListShow.map((element, i) => {
      if (i !== index) {
        element = false;
      }
      return element;
    });
  }

  scrollTo(id) {
    if (document.getElementById(id)) {
      document.getElementById(id).scrollIntoView();
    }
  }
}
