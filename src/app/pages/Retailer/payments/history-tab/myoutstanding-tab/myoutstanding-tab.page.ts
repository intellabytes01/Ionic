import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-myoutstanding-tab',
  templateUrl: './myoutstanding-tab.page.html',
  styleUrls: ['./myoutstanding-tab.page.scss'],
})
export class MyoutstandingTabPage implements OnInit {

  outstandingForm: FormGroup;
  storeList: any[] = [];
  constructor(private store: Store<AuthState>, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      e => { }
    );

    this.outstandingForm = this.formBuilder.group({
      store: [
        {
          StoreId: '',
          StoreName: ''
        },
        Validators.compose([])
      ]
    });
  }

  updateStore(val) {
    this.outstandingForm.value.store.StoreId = val.StoreId;
  }

}
