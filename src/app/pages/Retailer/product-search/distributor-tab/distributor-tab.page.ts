import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Events, IonContent } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { DistributorSearch, DistributorCompanies } from '../store/product-search.actions';
import {
  ProductSearchState
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { distributorSearchData, distributorCompaniesData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
import { Storage } from '@ionic/storage';

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
      this.distributorList = [];
      this.distributorCompaniesList = [];
    } else {
      const payload = {
        retailerId: this.retailerId,
        regionId: 1,
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
    this.distributorDetails = distributor;
    this.searchText = distributor.StoreName;
    this.showList = false;
    const payload = {
      storeId: distributor.StoreId
    };
    this.store.dispatch(new DistributorCompanies(payload));
    this.store.select(distributorCompaniesData, untilDestroyed(this)).subscribe(
      (state: any) => {
        console.log(state);
        this.distributorCompaniesList = state;
      },
      e => {}
    );
  }
}
