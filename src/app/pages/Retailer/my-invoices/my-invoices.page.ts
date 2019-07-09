import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ModalController, IonInfiniteScroll } from '@ionic/angular';
import { untilDestroyed } from '@app/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';
import { InvoiceFilterModalPage } from './invoice-filter-modal/invoice-filter-modal.page';

@Component({
  selector: 'pr-my-invoices',
  templateUrl: './my-invoices.page.html',
  styleUrls: ['./my-invoices.page.scss'],
})
export class MyInvoicesPage implements OnInit, OnDestroy {

  myInvoiceList$: any;
  myInvoiceList: any[] = [];
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  currentPage = 1;
  limit = 15;
  count = 0;
  invoiceFilter: any = { storeId: '', invoiceNo: ''};
  total: any = {
    amount: 0.0,
    count: 0
  };
  constructor(
    public modalController: ModalController,
    public router: Router
  ) {
    this.getMyInvoices();
  }

  ngOnInit() {}

  getMyInvoices() {
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

  loadData(event) {
    this.currentPage += 1;
    this.limit += this.limit;
    setTimeout(() => {
      this.getMyInvoices();
      event.target.complete();

      // App logic to determine if all data is loaded
      // and disable the infinite scroll
      if (this.count < this.limit) {
        event.target.disabled = true;
      }
    }, 500);
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
