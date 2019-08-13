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
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'pr-filter-modal',
  templateUrl: './filter-modal.page.html',
  styleUrls: ['./filter-modal.page.scss'],
})
export class FilterModalPage implements OnInit {
  public deliveryFilterForm: FormGroup;
  // tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant(
    'MY_ORDER.VALIDATION_MESSAGES'
  );
  storeList: any[] = [];
  deliveryFilter: any = {
    fromDate: '',
    toDate: '',
    status: '',
    query: '',
    store: ''
  };
  statusList = [{name: 'All'}, {name: 'Dispached'}, {name: 'Delivered'},
  {name: 'Rejected'}, {name: 'Not Delivered'}, {name: 'Delivery Attempted'}];
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
      },
      e => { }
    );
    this.deliveryFilter = this.navParams.get('value');
    this.deliveryFilterForm = this.formBuilder.group({
      store: [
        {
          StoreId: '',
          StoreName: ''
        },
        Validators.compose([])
      ],
      status: [
        {
          name: ''
        },
        Validators.compose([])
      ],
      query: [this.deliveryFilter.query, Validators.compose([])],
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
    this.deliveryFilterForm.value.store.StoreId = val.StoreId;
  }

  updateStatus(val) {
    this.deliveryFilterForm.value.status.name = val.name;
  }

  deliveryFilterSubmit() {
    if (this.deliveryFilterForm.invalid) {
      return;
    }

    this.deliveryFilter.fromDate = format(
      this.deliveryFilterForm.value.fromDate,
      'DD/MM/YY'
    );
    this.deliveryFilter.toDate = format(
      this.deliveryFilterForm.value.toDate,
      'DD/MM/YY'
    );
    this.deliveryFilter.store = this.deliveryFilterForm.value.store.StoreId;
    this.deliveryFilter.query = this.deliveryFilterForm.value.query;
    this.deliveryFilter.status = this.deliveryFilterForm.value.status.name;
    if (
      !isValid(new Date(this.deliveryFilter.fromDate)) ||
      !isValid(new Date(this.deliveryFilter.toDate))
    ) {
      this.alert.presentToast('warning', 'Invalid Date');
    } else {
      this.modalController.dismiss(this.deliveryFilter);
    }
  }
}
