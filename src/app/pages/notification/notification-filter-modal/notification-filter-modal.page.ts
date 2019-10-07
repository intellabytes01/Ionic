import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState, getRetailerStoreParties } from '@app/core/authentication/auth.states';
import { subDays, format } from 'date-fns';

@Component({
  selector: 'pr-notification-filter-modal',
  templateUrl: './notification-filter-modal.page.html',
  styleUrls: ['./notification-filter-modal.page.scss'],
})
export class NotificationFilterModalPage implements OnInit {

  public notificationFilterForm: FormGroup;
  storeList: any[] = [];
  statusList: any[] = [{
    id: 1,
    name: 'Party Mapped'
  }];
  minDate: any;
  constructor(public modalController: ModalController, public formBuilder: FormBuilder,
    private authStore: Store<AuthState> ) {
      const fromD = subDays(new Date(), 7);
      this.minDate = format(fromD, 'YYYY-MM-DD');
     }

  ngOnInit() {
    this.authStore.select(getRetailerStoreParties).subscribe(
      (state: any) => {
        this.storeList = state;
      },
      () => {}
    );

    this.notificationFilterForm = this.formBuilder.group({
      store: [],
      status: [
        {
          id: 8,
          name: 'Pratham Enterprises'
        },
        Validators.compose([])
      ],
      date: [
        new Date().toISOString(),
        Validators.compose([Validators.required])
      ]
    });
  }

  updateStatus(event) {

  }

  changeStore(event) {

  }

  notificationFilterSubmit() {
    this.modalController.dismiss();
  }

}
