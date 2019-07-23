import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { CompanySearch } from '../store/product-search.actions';
import {
  ProductSearchState,
  CompanyDetails
} from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { companySearchData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-company-tab',
  templateUrl: './company-tab.page.html',
  styleUrls: ['./company-tab.page.scss'],
})
export class CompanyTabPage implements OnInit {
  companyList: any[] = [];
  searchText = '';
  companyDetails: CompanyDetails;
  showList = true;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>
  ) {}

  ngOnInit() {}

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
        !(this.companyDetails &&
        this.searchText === this.companyDetails.CompanyName)
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
  }
}
