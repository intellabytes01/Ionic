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
  deliveryFilter: any = { storeId: '', deliveryNo: ''};
  constructor(
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public navParams: NavParams,
    public alert: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.deliveryFilter = this.navParams.get('value');
    this.deliveryFilterForm = this.formBuilder.group({
      store: [
        {
          id: this.deliveryFilter.storeId,
          name: 'Pharmex Lifecare'
        },
        Validators.compose([])
      ],
      deliveryNo: [this.deliveryFilter.deliveryNo, Validators.compose([])],
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
    this.deliveryFilterForm.value.storeId = val.id;
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
    this.deliveryFilter.storeId = this.deliveryFilterForm.value.store.id;
    this.deliveryFilter.deliveryNo = this.deliveryFilterForm.value.deliveryNo;
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
