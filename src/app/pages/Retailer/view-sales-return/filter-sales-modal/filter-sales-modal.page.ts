import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl
} from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { format, isValid } from 'date-fns';
import { TranslateService } from '@ngx-translate/core';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core/index';
import { AlertService } from '@app/shared/services/alert.service';
import { SalesReturnTypes } from '../store/view-sales-return.actions';
import { SalesReturnState } from '../store/view-sales-return.state';
import { salesReturnTypesData } from '../store/view-sales-return.reducers';

@Component({
  selector: 'pr-filter-sales-modal',
  templateUrl: './filter-sales-modal.page.html',
  styleUrls: ['./filter-sales-modal.page.scss'],
})
export class FilterSalesModalPage implements OnInit {
  public salesFilterForm: FormGroup;
  // tslint:disable-next-line: variable-name
    validation_messages = this.translateService.instant('MY_ORDER.VALIDATION_MESSAGES');
    storeList: any[] = [];
    salesReturnTypes$: any;
    salesFilter: any = {};
    constructor(
      public formBuilder: FormBuilder,
      public modalController: ModalController,
      public navParams: NavParams,
      private translateService: TranslateService,
      private store: Store<AuthState>,
      private salesReturnStore: Store<SalesReturnState>,
      private alert: AlertService
    ) {}
  
    ngOnInit() {
      this.getSalesReturnTypes();
      this.salesReturnTypes$ = this.salesReturnStore.pipe(select(salesReturnTypesData));
      this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
        (state: any) => {
          this.storeList = state;
        },
        e => { }
      );
      this.salesFilter = this.navParams.get('value');
      this.salesFilterForm = this.formBuilder.group({
        store: [
          {
            StoreId: this.salesFilter.storeId,
            StoreName: ''
          },
          Validators.compose([this.validateType])
        ],
        salesReturnNo: [this.salesFilter.salesReturnNo, Validators.compose([])],
        returnType: [this.salesFilter.returnType, Validators.compose([])],
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
  
    // Custom validation for returnType
  
    validateType(control: AbstractControl): { [key: string]: boolean } | null {
      if (!control.value.id) {
        return { validValue: true };
      }
      return null;
    }
  
    updateStore(val) {
      this.salesFilterForm.value.store.StoreId = val.StoreId;
    }
  
    salesFilterSubmit() {
      if (this.salesFilterForm.invalid) {
        return;
      }
  
      this.salesFilter.fromDate = format(
        this.salesFilterForm.value.fromDate,
        'DD/MM/YY'
      );
      this.salesFilter.toDate = format(
        this.salesFilterForm.value.toDate,
        'DD/MM/YY'
      );
      this.salesFilter.storeId = this.salesFilterForm.value.store.id;
      this.salesFilter.salesReturnNo = this.salesFilterForm.value.salesReturnNo;
      this.salesFilter.returnType = this.salesFilterForm.value.returnType;
      this.salesFilter.operation = this.salesFilterForm.value.operation;
      if (
        !isValid(new Date(this.salesFilter.fromDate)) ||
        !isValid(new Date(this.salesFilter.toDate))
      ) {
        this.alert.presentToast('warning', 'Invalid Date');
      } else {
        this.modalController.dismiss(this.salesFilter);
      }
    }

    getSalesReturnTypes() {
      this.salesReturnStore.dispatch(new SalesReturnTypes());
    }
  }
  