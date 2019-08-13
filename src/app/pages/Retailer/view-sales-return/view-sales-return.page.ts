import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import * as fromModel from './my-sales-data.json';
import { format } from 'date-fns';
import { FilterSalesModalPage } from './filter-sales-modal/filter-sales-modal.page';
import { SalesReturnState } from './store/view-sales-return.state.js';
import { salesReturnListData } from './store/view-sales-return.reducers.js';
import { SalesReturnList } from './store/view-sales-return.actions.js';

@Component({
  selector: 'pr-view-sales-return',
  templateUrl: './view-sales-return.page.html',
  styleUrls: ['./view-sales-return.page.scss'],
})
export class ViewSalesReturnPage implements OnInit, OnDestroy {

  mysalesReturnList: any[] = [];
  salesFilter: any = {};
  total: any = {
    amount: 0,
    count: 0
  };
  event: any;
  constructor(
    public modalController: ModalController,
    public router: Router,
    private salesReturnStore: Store<SalesReturnState>
  ) {
    this.getSalesReturnList();
  }

  ngOnInit() {
    this.salesReturnStore.select(salesReturnListData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.mysalesReturnList = state;
      },
      e => { }
    );
  }

  getSalesReturnList() {
    const payload = {
      fromDate: '',
      toDate: '',
      query: '',
      store: '',
      type: '',
    };
    this.salesReturnStore.dispatch(new SalesReturnList(payload));
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
        this.getSalesReturnList();
      }
    });
    return await modal.present();
  }

  goToSalesReturnDetails(sales) {
    this.router.navigateByUrl('view-sales-return/sales-detail', {
      state: { data: sales.RetailerCreditNoteId }
    });
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
