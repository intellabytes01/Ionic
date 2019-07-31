import { Component, OnInit } from '@angular/core';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states.js';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core/index.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-paylater-tab',
  templateUrl: './paylater-tab.page.html',
  styleUrls: ['./paylater-tab.page.scss'],
})
export class PaylaterTabPage implements OnInit {

  payLaterForm: FormGroup
  storeList: any[] = [];
  constructor(private store: Store<AuthState>, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      e => { }
    );

    this.payLaterForm = this.formBuilder.group({
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
    this.payLaterForm.value.store.StoreId = val.StoreId;
  }

}
