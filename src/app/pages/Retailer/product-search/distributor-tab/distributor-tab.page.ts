import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Events, IonContent } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { DistributorSearch, DistributorCompanies, CompanyProducts } from '../store/product-search.actions';
import {
  ProductSearchState
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { distributorSearchData, distributorCompaniesData, companyProductsData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';
import { AuthState, getRetailerId, getRegionId } from '@app/core/authentication/auth.states';

@Component({
  selector: 'app-distributor-tab',
  templateUrl: './distributor-tab.page.html',
  styleUrls: ['./distributor-tab.page.scss'],
})
export class DistributorTabPage implements OnInit {
  distributorList: any[] = [];
  distributorCompaniesList: any[] = [];
  searchText = '';
  distributorDetails: object;
  showList = true;
  retailerId: number;
  regionId: number;
  subListShow: any[] = [];
  index: number;
  companyProductList: any[] = [];
  storeId: string;
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
      this.distributorList = [];
      this.distributorCompaniesList = [];
    } else {
      const payload = {
        retailerId: this.retailerId,
        regionId: this.regionId,
        query: this.searchText,
        page: 1
      };
      if (
        !(
          this.distributorDetails &&
          this.searchText === this.distributorDetails['StoreName']
        )
      ) {
        this.showList = true;
        this.store.dispatch(new DistributorSearch(payload));
      }

      this.store.select(distributorSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.distributorList = state;
        },
        e => {}
      );
    }
  }

  distributorClick(distributor) {
    this.storeId = distributor.StoreId;
    this.distributorDetails = distributor;
    this.searchText = distributor.StoreName;
    this.showList = false;
    const payload = {
      storeId: distributor.StoreId
    };
    this.store.dispatch(new DistributorCompanies(payload));
    this.store.select(distributorCompaniesData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.distributorCompaniesList = state;
      },
      e => {}
    );
  }

  companyClick(company, index) {
    this.toggle(index);
    const payload = {
      storeId: this.storeId,
      page: 1,
      companyId: company.CompanyId
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
          this.scrollTo(company.CompanyId);
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
