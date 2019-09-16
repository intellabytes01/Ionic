import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { format, isValid } from 'date-fns';
import { AlertService } from '@app/shared/services/alert.service.js';
import { TranslateService } from '@ngx-translate/core';
import {
  getRetailerStoreParties,
  AuthState
} from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { Store } from '@ngrx/store';
import { differenceInDays, subMonths } from 'date-fns';

@Component({
  selector: 'pr-invoice-filter-modal',
  templateUrl: './invoice-filter-modal.page.html',
  styleUrls: ['./invoice-filter-modal.page.scss']
})
export class InvoiceFilterModalPage implements OnInit {
  public invoiceFilterForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant(
    'MY_ORDER.VALIDATION_MESSAGES'
  );
  storeList: any[] = [];
  invoiceFilter: any = {
    storeId: null,
    retailerId: null,
    toDate: '2019-03-01',
    fromDate: '2019-02-01',
    query: ''
  };
  title = '';
  templates = [
    'Select invoice template',
    'Pharmarack',
    'Technomax',
    'Skyway',
    'Wondersoft'
  ];
  invoice = { template: 'Select invoice template' };
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    public alert: AlertService,
    private translateService: TranslateService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    if (this.navParams.get('value')) {
      this.store
        .select(getRetailerStoreParties, untilDestroyed(this))
        .subscribe(
          (state: any) => {
            this.storeList = state;
            this.setForm();
          },
          e => {}
        );
      this.invoiceFilter = this.navParams.get('value');
    }

    if (this.navParams.get('title')) {
      this.title = this.navParams.get('title');
    }
  }

  setForm() {
    this.invoiceFilterForm = this.formBuilder.group({
      store: [
        {
          StoreId: this.invoiceFilter.storeId,
          StoreName: '',
          PartyCode: this.invoiceFilter.partyCode
        },
        Validators.compose([])
      ],
      query: [this.invoiceFilter.query, Validators.compose([])],
      fromDate: [
        subMonths(new Date(), 1).toISOString(),
        Validators.compose([Validators.required])
      ],
      toDate: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ]
    });
  }

  updateStore(val) {
    this.invoiceFilterForm.value.store.StoreId = val.StoreId;
  }

  dateCheck(type) {
    if (type === 'from') {
      this.invoiceFilterForm
        .get('toDate')
        .setValue(
          subMonths(this.invoiceFilterForm.value.fromDate, -1).toISOString()
        );
      this.invoiceFilterForm
        .get('fromDate')
        .setValue(
          subMonths(this.invoiceFilterForm.value.toDate, 1).toISOString()
        );
    } else {
      this.invoiceFilterForm
        .get('fromDate')
        .setValue(
          subMonths(this.invoiceFilterForm.value.toDate, 1).toISOString()
        );
      this.invoiceFilterForm
        .get('toDate')
        .setValue(
          subMonths(this.invoiceFilterForm.value.fromDate, -1).toISOString()
        );
    }
  }

  invoiceFilterSubmit() {
    const dateDiffDays = differenceInDays(
      this.invoiceFilterForm.value.toDate,
      this.invoiceFilterForm.value.fromDate
    );
    if (dateDiffDays > 31) {
      this.alert.presentToast(
        'warning',
        this.translateService.instant('INVOICE.DATE_VALIDATION_DAYS')
      );
    } else if (dateDiffDays < 0) {
      this.alert.presentToast(
        'warning',
        this.translateService.instant('INVOICE.DATE_VALIDATION_VALID')
      );
    } else {
      this.invoiceFilter.fromDate = format(
        this.invoiceFilterForm.value.fromDate,
        'DD/MM/YY'
      );
      this.invoiceFilter.toDate = format(
        this.invoiceFilterForm.value.toDate,
        'DD/MM/YY'
      );
      this.invoiceFilter.storeId = this.invoiceFilterForm.value.store.StoreId;
      this.invoiceFilter.query = this.invoiceFilterForm.value.query;
      this.invoiceFilter.partyCode = this.invoiceFilterForm.value.store.PartyCode;
      this.modalController.dismiss(this.invoiceFilter);
    }
  }

  invoiceDownloadSubmit() {
    this.modalController.dismiss(this.invoice.template);
  }
}
