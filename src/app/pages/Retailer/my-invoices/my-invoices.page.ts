import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { InvoiceFilterModalPage } from './invoice-filter-modal/invoice-filter-modal.page';
import { InvoiceState } from './store/my-invoices.state';
import { InvoiceList } from './store/my-invoices.actions';
import { invoiceData } from './store/my-invoices.reducers';

@Component({
  selector: 'pr-my-invoices',
  templateUrl: './my-invoices.page.html',
  styleUrls: ['./my-invoices.page.scss']
})
export class MyInvoicesPage implements OnInit, OnDestroy {
  myInvoiceList: any[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  currentPage = 1;
  limit = 15;
  count = 0;
  invoiceFilter: any = { storeId: '151', invoiceNo: '', partyCode: '60917' };
  total: any = {
    amount: 0.0,
    count: 0
  };
  constructor(
    public modalController: ModalController,
    public router: Router,
    private store: Store<InvoiceState>
  ) {
    this.getMyInvoices();
  }

  ngOnInit() {}

  getMyInvoices() {
    const payload = {
      storeId: this.invoiceFilter.storeId,
      partyCode: this.invoiceFilter.partyCode
    };
    this.store.dispatch(new InvoiceList(payload));
    this.store
      .pipe(
        select(invoiceData),
        untilDestroyed(this)
      )
      .subscribe(state => {
        this.myInvoiceList = state;
      });
  }

  async presentModalInvoiceFilter() {
    const modal = await this.modalController.create({
      component: InvoiceFilterModalPage,
      componentProps: { value: this.invoiceFilter }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.invoiceFilter = data.data;
        this.myInvoiceList = [];
        this.getMyInvoices();
      }
    });
    return await modal.present();
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
