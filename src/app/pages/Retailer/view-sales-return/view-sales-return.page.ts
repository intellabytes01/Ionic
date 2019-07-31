import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import * as fromModel from './my-sales-data.json';
import { format } from 'date-fns';
import { FilterSalesModalPage } from './filter-sales-modal/filter-sales-modal.page';

@Component({
  selector: 'pr-view-sales-return',
  templateUrl: './view-sales-return.page.html',
  styleUrls: ['./view-sales-return.page.scss'],
})
export class ViewSalesReturnPage implements OnInit {
  
  mysalesReturnList: any[] = [];
  salesFilter: any = {};
  total: any = {
    amount: 0,
    count: 0
  };
  event: any;
  constructor(
    public modalController: ModalController,
    public router: Router
  ) {
    this.getMysalesReturns();
  }

  ngOnInit() {
    this.router.navigateByUrl('view-sales-return/sales-detail', {
    });
  }

  getMysalesReturns() {
  }

  async presentModalSalesReturnFilter() {
    const modal = await this.modalController.create({
      component: FilterSalesModalPage,
      componentProps: { value: this.salesFilter }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.salesFilter = data.data;
        this.mysalesReturnList = [];
        this.getMysalesReturns();
      }
    });
    return await modal.present();
  }

  goToSalesReturnDetails(sales) {
    this.router.navigateByUrl('view-sales-return/sales-detail', {
      state: { data: JSON.stringify(sales) }
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
