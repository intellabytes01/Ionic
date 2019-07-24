import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { CompanySearch, CompanyStores, CompanyProducts } from '../store/product-search.actions';
import {
  ProductSearchState,
  CompanyDetails
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { companySearchData, companyStoresData, companyProductsData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';

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
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>,
    private storage: Storage
  ) {}

  ngOnInit() {
    this.storage.get('userData').then((data) => {
      this.retailerId = JSON.parse(data)['userData']['retailerSummary']['retailerInfo']['RetailerId'];
    });
  }

  search() {
    if (this.searchText.length < 3) {
      this.companyList = [];
      this.companyDetails = {} as CompanyDetails;
    } else {
      const payload = {
        regionId: 1,
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

  storeClick(store) {
    const payload = {
      storeId: store.StoreId,
      page: 1,
      companyId: this.companyId
    };
    this.store.dispatch(new CompanyProducts(payload));
    this.store.select(companyProductsData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.companyProductList = state;
      },
      e => {}
    );
  }

  // For sublist
  toggle(index) {
    if (this.subListShow[index] === undefined) {
      this.subListShow[index] = false;
    }
    this.subListShow[index] = !this.subListShow[index];
  }
}
