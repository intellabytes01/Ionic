import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';
import { ProductSearch } from '../store/product-search.actions';
import { ProductSearchState, ProductDetails } from '../store/product-search.state';
import { Store } from '@ngrx/store';
import { productSearchData } from '../store/product-search.reducers';
import { untilDestroyed } from '@app/core';
@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.page.html',
  styleUrls: ['./product-tab.page.scss'],
})
export class ProductTabPage implements OnInit {

  productList: any[] = [];
  searchText = '';
  productDetails: ProductDetails;
  showList = true;
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events,
    private store: Store<ProductSearchState>,
  ) {
  }

  ngOnInit() {}

  search() {
    this.showList = true;
    if (this.searchText.length < 3) {
      this.productList = [];
    } else {
      const payload = {
        regionId: 1,
        query: this.searchText,
        page: 1
      };
      this.store.dispatch(
        new ProductSearch(payload)
      );

      this.store.select(productSearchData, untilDestroyed(this)).subscribe(
        (state: any) => {
            this.productList = state;
        },
        e => {
        }
      );
    }
  }

  productClick(product) {
    this.productDetails = product;
    this.searchText = product.ProductName;
    this.showList = false;
  }
}
