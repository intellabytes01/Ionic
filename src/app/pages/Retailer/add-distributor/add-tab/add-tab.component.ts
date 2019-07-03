import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class AddTabComponent implements OnInit, OnDestroy {
  distributorForm: FormGroup;
  mobnumPattern = '^((\\+91-?)|0)?[0-9]{10}$';
// tslint:disable-next-line: variable-name
  validation_messages = this.translateService.instant('ADD_DISTRIBUTOR.VALIDATION_MESSAGES');
  constructor(
    private storeAuth: Store<AuthState>,
    private storeAddDistributor: Store<AddDistributorState>,
    public formBuilder: FormBuilder, private translateService: TranslateService
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
    this.storeAuth.pipe(select(selectAuthState),
    untilDestroyed(this)).subscribe(data => {
      this.distributorForm.value.retailerId =
        data['userData']['userData']['retailerSummary']['retailerInfo'][
          'RetailerId'
        ];
    });
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

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
