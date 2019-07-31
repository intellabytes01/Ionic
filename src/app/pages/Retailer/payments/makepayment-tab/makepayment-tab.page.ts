import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OutstandingModalPage } from './outstanding-modal/outstanding-modal.page';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'app-makepayment-tab',
  templateUrl: './makepayment-tab.page.html',
  styleUrls: ['./makepayment-tab.page.scss'],
})
export class MakepaymentTabPage implements OnInit {

  makepaymentForm: FormGroup;
  storeList: any[] = [];
  constructor(public modalController: ModalController, private store: Store<AuthState>, public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.store.select(getRetailerStoreParties, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      e => { }
    );

    this.makepaymentForm = this.formBuilder.group({
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
    this.makepaymentForm.value.store.StoreId = val.StoreId;
  }

  async presentModalOutstanding() {
    const modal = await this.modalController.create({
      component: OutstandingModalPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }
}
