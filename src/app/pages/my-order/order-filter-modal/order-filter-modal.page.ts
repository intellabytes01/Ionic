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

@Component({
  selector: 'app-order-filter-modal',
  templateUrl: './order-filter-modal.page.html',
  styleUrls: ['./order-filter-modal.page.scss']
})
export class OrderFilterModalPage implements OnInit {
  public orderFilterForm: FormGroup;
  validation_messages = {
    store: [{ type: 'validValue', message: 'Value is required for Remarks.' }],
    orderNo: [{ type: 'required', message: 'It\'s required.' }],
    fromDate: [{ type: 'required', message: 'It\'s required.' }],
    toDate: [{ type: 'required', message: 'It\'s required.' }]
  };
  storeList: any[] = fromModel.storeList;
  statusList: any[] = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Success' },
    { id: 3, name: 'Pending' },
    { id: 4, name: 'Failed' },
    { id: 5, name: 'Other' }
  ];
  operationTypes: any[] = [
    { id: '1', name: 'View' },
    { id: '2', name: 'Email' }
  ];
  orderFilter: any = {};
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    public alert: AlertService
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
      fromDate: [
        this.orderFilter.fromDate,
        Validators.compose([Validators.required])
      ],
      toDate: [
        this.orderFilter.toDate,
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
    if (
      !isValid(new Date(this.orderFilter.fromDate)) ||
      !isValid(new Date(this.orderFilter.toDate))
    ) {
      this.alert.presentToast('Invalid Date');
    } else {
      this.modalController.dismiss(this.orderFilter);
    }
  }
}
