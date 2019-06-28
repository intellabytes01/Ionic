import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-order-filter-modal',
  templateUrl: './order-filter-modal.page.html',
  styleUrls: ['./order-filter-modal.page.scss']
})
export class OrderFilterModalPage implements OnInit {
  public orderFilterForm: FormGroup;
  validation_messages = {
    store: [{ type: 'validValue', message: 'Value is required for Remarks.' }],
    status: [{ type: 'validValue', message: 'It\'s required.' }],
    orderNo: [{ type: 'required', message: 'It\'s required.' }],
    fromDate: [{ type: 'required', message: 'It\'s required.' }],
    toDate: [{ type: 'required', message: 'It\'s required.' }],
    operation: [{ type: 'required', message: 'It\'s required.' }],
    emailIds: [{ type: 'required', message: 'It\'s required.' }],
    count: [{ type: 'required', message: 'It\'s required.' }]
  };
  storeList: any[] = [];
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
    private navParams: NavParams
  ) {}


  ngOnInit() {
    console.log(this.navParams.get('value'));
    this.orderFilter = this.navParams.get('value');

    this.orderFilterForm = this.formBuilder.group({
      store: [
        {
          id: this.orderFilter.storeId,
          name: 'Pharmex Lifecare'
        },
        Validators.compose([this.validateType])
      ],
      status: [
        {
          id: '',
          name: ''
        },
        Validators.compose([this.validateType])
      ],
      orderNo: [this.orderFilter.orderNo, Validators.compose([Validators.required])],
      fromDate: [this.orderFilter.fromDate, Validators.compose([Validators.required])],
      toDate: [this.orderFilter.toDate, Validators.compose([Validators.required])],
      operation: ['', Validators.compose([Validators.required])],
      emailIds: ['', Validators.compose([Validators.required])],
      count: ['', Validators.compose([Validators.required])]
    });
  }

  // Custom validation for status

  validateType(control: AbstractControl): { [key: string]: boolean } | null {
    if (!control.value.id) {
      return { validValue: true };
    }
    return null;
  }

  updateStore(val){

  }

  orderFilterSubmit() {
    this.modalController.dismiss(this.orderFilter);
  }
}
