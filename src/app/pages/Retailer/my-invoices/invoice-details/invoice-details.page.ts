import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { InvoiceState } from '../store/my-invoices.state';
import { Store, select } from '@ngrx/store';
import { InvoiceDetail } from '../store/my-invoices.actions';
import { untilDestroyed } from '@app/core';
import { invoiceDetailData } from '../store/my-invoices.reducers';
import { AuthState, getRetailerId } from '@app/core/authentication/auth.states';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'pr-invoice-details',
  templateUrl: './invoice-details.page.html',
  styleUrls: ['./invoice-details.page.scss']
})
export class InvoiceDetailsPage implements OnInit, OnDestroy {
  state$: Observable<object>;
  invoiceDetails = [];
  invoiceId: string;
  retailerId: number;
  constructor(
    private alertService: AlertService,
    private translateService: TranslateService,
    private store: Store<InvoiceState>,
    private authStore: Store<AuthState>,
    public activatedRoute: ActivatedRoute,
    private iab: InAppBrowser
  ) {}

  download() {
    this.alertService.basicAlert(
      this.translateService.instant('INVOICE.DOWNLOADED_TEXT'),
      this.translateService.instant('INVOICE.ATTENTION')
    );
    const payload = {
      retailerId: this.retailerId,
      invoices: [this.invoiceId],
      action: 'download'
    };
    this.store.dispatch(new InvoiceDetail(payload));
    this.store
      .pipe(
        select(invoiceDetailData),
        untilDestroyed(this)
      )
      .subscribe(state => {
        if (state) {
          state.forEach(element => {});
        }
      });
  }

  getMyInvoicesDetail(retailerId) {
    const payload = {
      retailerId,
      invoices: [this.invoiceId],
      action: 'view'
    };
    this.store.dispatch(new InvoiceDetail(payload));
    this.store
      .pipe(
        select(invoiceDetailData),
        untilDestroyed(this)
      )
      .subscribe(state => {
        this.invoiceDetails = state;
      });
  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data.data) {
        this.invoiceId = data.data;
        this.authStore.select(getRetailerId, untilDestroyed(this)).subscribe(
          (state: any) => {
            if (state) {
              this.getMyInvoicesDetail(state);
              this.retailerId = state;
            }
          },
          e => {}
        );
      }
    });
  }

  call(mobile) {
    this.iab.create(`tel:${mobile}`);
  }

  ngOnDestroy() {}
}
