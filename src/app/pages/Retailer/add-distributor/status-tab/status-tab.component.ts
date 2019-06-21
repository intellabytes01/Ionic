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
  styleUrls: ['./status-tab.component.scss'],
})
export class StatusTabComponent implements OnInit {

  statusList: any[] = [];
  status$: any;
  constructor(
    private statusAuth: Store<AuthState>,
    private statusAddDistributor: Store<AddDistributorState>,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.statusAuth.pipe(select(selectAuthState)).subscribe(data => {
      this.getStatus(data['userData']['userData']['userSummary']['UserId']);
    }),
      untilDestroyed(this);
    this.status$ = this.statusAddDistributor.pipe(select(statusData));
  }

  getStatus(retailerId) {
    const payload = {
      retailerId: 3
    };
    this.statusAddDistributor.dispatch(new GetStatus(payload));
  }

  async presentModalStatusFilter() {
    const modal = await this.modalController.create({
      component: StatusFilterPage,
      componentProps: { value: '' }
    });
    return await modal.present();
  }

}
