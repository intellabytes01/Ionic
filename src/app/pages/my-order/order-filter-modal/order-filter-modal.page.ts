import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { format, isValid } from 'date-fns';
import * as fromModel from '../my-order-data.json';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core/index';
import {subDays} from 'date-fns';

@Component({
  selector: 'app-order-filter-modal',
  templateUrl: './order-filter-modal.page.html',
  styleUrls: ['./order-filter-modal.page.scss']
})
export class OrderFilterModalPage implements OnInit {
  public orderFilterForm: FormGroup;
// tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('MY_ORDER.VALIDATION_MESSAGES');
  storeList: any[] = [];
  statusList: any[] = fromModel.status;
  operationTypes: any[] = fromModel.operation;
  orderFilter: any = {};
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
    this.orderFilter = this.navParams.get('value');
    this.orderFilterForm = this.formBuilder.group({
      store: [
        {
          StoreId: this.orderFilter.storeId,
          StoreName: 'Pharmex Lifecare'
        },
        Validators.compose([this.validateType])
      ],
      orderNo: [this.orderFilter.orderNo, Validators.compose([])],
      status: [this.orderFilter.status, Validators.compose([])],
      operation: [this.orderFilter.operation, Validators.compose([])],
      fromDate: [
        subDays(new Date(), 7).toISOString(),
        Validators.compose([Validators.required])
      ],
      toDate: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ]
    });
  }

  // Custom validation for status

  validateType(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.id) {
      return { validValue: true };
    }
    return null;
  }

  updateStore(val) {
    this.orderFilterForm.value.store.StoreId = val.StoreId;
  }

  orderFilterSubmit() {
    this.orderFilter.fromDate = format(
      this.orderFilterForm.value.fromDate,
      'DD/MM/YY'
    );
    this.orderFilter.toDate = format(
      this.orderFilterForm.value.toDate,
      'DD/MM/YY'
    );
    this.orderFilter.storeId = this.orderFilterForm.value.store.id ? this.orderFilterForm.value.store.id : null;
    this.orderFilter.orderNo = this.orderFilterForm.value.orderNo ? this.orderFilterForm.value.orderNo : null;
    this.orderFilter.status = this.orderFilterForm.value.status ? this.orderFilterForm.value.status : null;
    this.orderFilter.operation = this.orderFilterForm.value.operation ? this.orderFilterForm.value.operation : null;
    if (
      !isValid(new Date(this.orderFilterForm.value.fromDate)) ||
      !isValid(new Date(this.orderFilterForm.value.toDate))
    ) {
      this.alert.presentToast('warning', 'Invalid Date');
    } else {
      this.modalController.dismiss(this.orderFilter);
    }
  }
}
