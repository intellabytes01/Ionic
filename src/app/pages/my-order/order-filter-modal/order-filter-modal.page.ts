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
import { AlertService } from '@app/shared/services/alert.service.js';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-filter-modal',
  templateUrl: './order-filter-modal.page.html',
  styleUrls: ['./order-filter-modal.page.scss']
})
export class OrderFilterModalPage implements OnInit {
  public orderFilterForm: FormGroup;
// tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('MY_ORDER.VALIDATION_MESSAGES');
  storeList: any[] = fromModel.storeList;
  statusList: any[] = fromModel.status;
  operationTypes: any[] = fromModel.operation;
  orderFilter: any = {};
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    public alert: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.orderFilter = this.navParams.get('value');
    this.orderFilterForm = this.formBuilder.group({
      store: [
        {
          id: this.orderFilter.storeId,
          name: 'Pharmex Lifecare'
        },
        Validators.compose([this.validateType])
      ],
      orderNo: [this.orderFilter.orderNo, Validators.compose([])],
      status: [this.orderFilter.status, Validators.compose([])],
      operation: [this.orderFilter.operation, Validators.compose([])],
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

  // Custom validation for status

  validateType(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.id) {
      return { validValue: true };
    }
    return null;
  }

  updateStore(val) {
    this.orderFilterForm.value.storeId = val.id;
  }

  orderFilterSubmit() {
    if (this.orderFilterForm.invalid) {
      return;
    }

    this.orderFilter.fromDate = format(
      this.orderFilterForm.value.fromDate,
      'DD/MM/YY'
    );
    this.orderFilter.toDate = format(
      this.orderFilterForm.value.toDate,
      'DD/MM/YY'
    );
    this.orderFilter.storeId = this.orderFilterForm.value.store.id;
    this.orderFilter.orderNo = this.orderFilterForm.value.orderNo;
    this.orderFilter.status = this.orderFilterForm.value.status;
    this.orderFilter.operation = this.orderFilterForm.value.operation;
    if (
      !isValid(new Date(this.orderFilter.fromDate)) ||
      !isValid(new Date(this.orderFilter.toDate))
    ) {
      this.alert.presentToast('warning', 'Invalid Date');
    } else {
      this.modalController.dismiss(this.orderFilter);
    }
  }
}
