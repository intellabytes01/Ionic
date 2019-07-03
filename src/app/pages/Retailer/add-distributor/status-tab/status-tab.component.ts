import { Component, OnInit } from '@angular/core';
import {
  AuthState,
  selectAuthState
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { AddDistributorState } from '../store/add-distributor.state';
import { statusData } from '../store/add-distributor.reducers';
import { GetStatus } from '../store/add-distributor.actions';
import { ModalController } from '@ionic/angular';
import { StatusFilterPage } from './status-filter/status-filter.page';

@Component({
  selector: 'app-status-tab',
  templateUrl: './status-tab.component.html',
  styleUrls: ['./status-tab.component.scss']
})
export class StatusTabComponent implements OnInit {
  statusList: any[] = [];
  tempList: any[] = [];
  status$: any;
  selectedStatus: string;
  constructor(
    private statusAuth: Store<AuthState>,
    private statusAddDistributor: Store<AddDistributorState>,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    // Get retailer id

    this.statusAuth.pipe(select(selectAuthState)).subscribe(data => {
      this.getStatus(data['userData']['userData']['retailerSummary']['retailerInfo']['RetailerId']);
    }),
      untilDestroyed(this);

    // Get status list for filter
    this.status$ = this.statusAddDistributor
      .pipe(select(statusData))
      .subscribe(data => {
        this.statusList = data;
        this.tempList = data;
      }),
      untilDestroyed(this);
  }

  getStatus(retailerId) {
    const payload = {
      retailerId
    };
    this.statusAddDistributor.dispatch(new GetStatus(payload));
  }

  // Status filter modal

  async presentModalStatusFilter() {
    const modal = await this.modalController.create({
      component: StatusFilterPage,
      componentProps: { value: this.selectedStatus }
    });
    modal.onDidDismiss().then(data => {
      if (data.data) {
        this.selectedStatus = data.data;
        this.statusList = this.tempList.filter(element => {
          return element.Status === data.data;
        });
      }
    });
    return await modal.present();
  }
}
