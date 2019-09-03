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
import { differenceInDays } from 'date-fns';

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
  invoiceFilter: any = { storeId: '', invoiceNo: '', partyCode: '' };
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    public alert: AlertService,
    private translateService: TranslateService,
    private store: Store<AuthState>
  ) {}

  ngOnInit() {
    this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
        this.setForm();
      },
      e => {}
    );
    this.invoiceFilter = this.navParams.get('value');
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
      invoiceNo: [this.invoiceFilter.invoiceNo, Validators.compose([])],
      fromDate: [
        new Date().toISOString(),
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
    this.invoiceFilterForm.value.store.PartyCode = val.PartyCode;
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
      this.invoiceFilter.invoiceNo = this.invoiceFilterForm.value.invoiceNo;
      this.invoiceFilter.partyCode = this.invoiceFilterForm.value.store.PartyCode;
      if (
        !isValid(new Date(this.invoiceFilter.fromDate)) ||
        !isValid(new Date(this.invoiceFilter.toDate))
      ) {
        this.alert.presentToast('warning', 'Invalid Date');
      } else {
        this.modalController.dismiss(this.invoiceFilter);
      }
    }
  }
}
