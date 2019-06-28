import { Component, OnInit } from '@angular/core';
import { AddDistributorState } from '../store/add-distributor.state';
import { Store, select } from '@ngrx/store';
import {
  AuthState,
  selectAuthState
} from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistributorSubmit } from '../store/add-distributor.actions';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.scss']
})
export class AddTabComponent implements OnInit {
  distributorForm: FormGroup;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  validation_messages = {
    mobile: [
      { type: 'required', message: 'VALIDATIONS.MOBILEREQUIRED' },
      {
        type: 'pattern',
        message: 'VALIDATIONS.MOBILEPATTERN'
      }
    ],
    storeName: [{ type: 'required', message: 'ADD_DISTRIBUTOR.VALIDATIONS.DISTRIBUTOR_NAME' }]
  };
  constructor(
    private storeAuth: Store<AuthState>,
    private storeAddDistributor: Store<AddDistributorState>,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.distributorForm = this.formBuilder.group({
      mobile: [
        '',
        Validators.compose([
          Validators.pattern(this.mobnumPattern),
          Validators.required
        ])
      ],
      storeName: [
        '',
        Validators.compose([Validators.required])
      ],
      retailerId: [null]
    });

    // Set retailer id
    this.storeAuth.pipe(select(selectAuthState)).subscribe(data => {
      this.distributorForm.value.retailerId =
        data['userData']['userData']['retailerSummary']['retailerInfo'][
          'RetailerId'
        ];
    }),
      untilDestroyed(this);
  }

  validationMobile(value) {
    this.distributorForm.controls.mobile.setValue(
      value.length > 10 ? value.substring(0, 10) : value
    );
  }

  distributorSubmit() {
    if (this.distributorForm.invalid) {
      return;
    }
    const body = {
      retailerId: Number(this.distributorForm.value.retailerId),
      storeName: this.distributorForm.value.storeName,
      mobile: this.distributorForm.value.mobile
    };
    this.storeAddDistributor.dispatch(
      new DistributorSubmit(body)
    );
  }

  trackByFn(index, item) {
    return index;
  }
}
