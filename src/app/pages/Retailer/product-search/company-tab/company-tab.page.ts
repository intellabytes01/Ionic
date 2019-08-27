import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Events, IonContent } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { CompanySearch, CompanyStores, CompanyProducts } from '../store/product-search.actions';
import {
  ProductSearchState,
  CompanyDetails
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { companySearchData, companyStoresData, companyProductsData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import { AuthState, getRetailerId, getRegionId } from '@app/core/authentication/auth.states';

@Component({
  selector: 'app-company-tab',
  templateUrl: './company-tab.page.html',
  styleUrls: ['./company-tab.page.scss']
})
export class CompanyTabPage implements OnInit {
  companyList: any[] = [];
  companyStoreList: any[] = [];
  companyProductList: any[] = [];
  searchText = '';
  companyDetails: CompanyDetails;
  showList = true;
  retailerId: number;
  subListShow: any[] = [];
  companyId: number;
  index: number;
  regionId: number;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>,
    private authStore: Store<AuthState>
  ) {}

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
      this.companyList = [];
      this.companyDetails = {} as CompanyDetails;
      this.companyProductList = [];
      this.companyStoreList = [];
    } else {
      const payload = {
        regionId: this.regionId,
        query: this.searchText,
        page: 1
      };
      if (
        !(
          this.companyDetails &&
          this.searchText === this.companyDetails.CompanyName
        )
      ) {
        this.showList = true;
        this.store.dispatch(new CompanySearch(payload));
      }

      this.store.select(companySearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.companyList = state;
        },
        e => {}
      );
    }
  }

  companyClick(company) {
    this.companyDetails = company;
    this.searchText = company.CompanyName;
    this.showList = false;
    this.companyId = company.CompanyCode;
    const payload = {
      regionId: company.RegionId,
      retailerId: this.retailerId,
      slot: company.slot,
      companyId: company.CompanyCode
    };
    this.store.dispatch(new CompanyStores(payload));
    this.store.select(companyStoresData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.companyStoreList = state;
      },
      e => {}
    );
  }

  storeClick(store, index) {
    this.toggle(index);
    const payload = {
      storeId: store.StoreId,
      page: 1,
      companyId: this.companyId
    };
    if (this.subListShow[index]) {
      this.store.dispatch(new CompanyProducts(payload));
    } else {
      this.companyProductList[index] = [];
    }
    this.store.select(companyProductsData, untilDestroyed(this)).subscribe(
      (state: any) => {
        if (this.index === index) {
          this.companyProductList[index] = state;
          this.scrollTo(store.StoreId);
        }
      },
      e => {}
    );

  }

  toggle(index) {
    this.index = index;
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
