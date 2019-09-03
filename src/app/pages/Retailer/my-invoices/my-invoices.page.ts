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
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

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
  masterCheck = false;
  templates = ['Pharmarack', 'Technomax', 'Skyway', 'Wondersoft'];
  constructor(
    public modalController: ModalController,
    public router: Router,
    private store: Store<InvoiceState>,
    private alertService: AlertService,
    private translateService: TranslateService
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
        // Set isChecked false initially
        if (state) {
          state.forEach(obj => {
            obj.isChecked = false;
            obj.template = this.templates[3];
          });
          this.myInvoiceList = state;
        }
      });
  }

  async presentModalInvoiceFilter() {
    const modal = await this.modalController.create({
      component: InvoiceFilterModalPage,
      componentProps: { value: this.invoiceFilter }
    });
    modal.onDidDismiss().then(data => {
      console.log(data);
      if (data.data) {
        this.invoiceFilter = data.data;
        this.myInvoiceList = [];
        this.getMyInvoices();
      }
    });
    return await modal.present();
  }

  // Check for select all

  checkMaster() {
    if (this.myInvoiceList) {
      this.myInvoiceList = this.myInvoiceList.map(obj => {
        obj.isChecked = this.masterCheck;
        return obj;
      });
    }
  }

  // User selects invoice

  checkEvent(invoiceNo?: any) {
    const totalItems = this.myInvoiceList.length;
    let checked = 0;
    this.myInvoiceList = this.myInvoiceList.map(obj => {
      if (invoiceNo && obj.InvoiceNo === invoiceNo) {
        obj.isChecked = !obj.isChecked;
      }
      if (obj.isChecked) {
        checked++;
      }
      return obj;
    });
    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.masterCheck = false;
    } else if (checked === totalItems) {
      // If all are checked
      this.masterCheck = true;
    } else {
      // If none is checked
      this.masterCheck = false;
    }
  }

  goToInvoiceDetails() {
    this.router.navigateByUrl('my-invoices/invoice-details');
  }

  download() {
    let checked = 0;
    this.myInvoiceList.map(obj => {
      if (obj.isChecked) {
        checked++;
      }
      return obj;
    });
    if (checked === 0) {
      this.alertService.basicAlert(
        this.translateService.instant('INVOICE.DOWNLOAD_TEXT'),
        this.translateService.instant('INVOICE.ATTENTION')
      );
    } else {
    }
  }

  setTemplate(template, i) {
    this.myInvoiceList[i].template = template;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
