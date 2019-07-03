import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { AlertService } from '@app/shared/services/alert.service';

@Component({
  selector: 'app-product-tab',
  templateUrl: './product-tab.page.html',
  styleUrls: ['./product-tab.page.scss'],
})
export class ProductTabPage implements OnInit {

  productStore: any;
  productList: any[] = [];
  searchKey = '';
  constructor(
    private router: Router,
    private alertService: AlertService,
    public events: Events
  ) {
  }

  ngOnInit() {}

  search(searchKey) {
    if (searchKey.length < 3) {
      this.productList = [];
    } else {
      // this.alertService.loader = true;
      // this.store.dispatch(
      //   new fromproductsearch.GetAllProducts({ key: searchKey })
      // );

      // this.productStore = this.store.select(getProducts).subscribe(
      //   (state: any) => {
      //     this.alertService.loader = false;

      //     if (state.success) {
      //       this.productList = state.data;
      //     } else {
      //       this.alertService.presentToast(state.message);
      //     }
      //   },
      //   e => {
      //     this.alertService.loader = false;
      //     this.alertService.presentToast("Please provide valid data.");
      //   }
      // );
    }
  }

  handleProductClick() {}
}
