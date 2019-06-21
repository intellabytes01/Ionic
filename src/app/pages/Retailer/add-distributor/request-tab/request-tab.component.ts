import { Component, OnInit } from '@angular/core';
import {
  AuthState,
  selectAuthState
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { AddDistributorState } from '../store/add-distributor.state';
import { storesData } from '../store/add-distributor.reducers';
import { GetStores, RequestSubmit } from '../store/add-distributor.actions';
import { AlertService } from '@app/shared/services/alert.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-request-tab',
  templateUrl: './request-tab.component.html',
  styleUrls: ['./request-tab.component.scss']
})
export class RequestTabComponent implements OnInit {
  searchList: any[] = [];
  storeList: any[] = [];
  searchText = '';
  stores$: any;
  requestSubmitBody: any = {
    retailerId: 3,
    userId: null,
    storeIds: []
  };
  isIndeterminate: boolean;
  masterCheck = false;
  constructor(
    private storeAuth: Store<AuthState>,
    private storeAddDistributor: Store<AddDistributorState>,
    private alert: AlertService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.storeAuth.pipe(select(selectAuthState)).subscribe(data => {
      this.requestSubmitBody.userId = data['userData']['userData']['userSummary']['UserId'];
      this.getStores();
    }),
      untilDestroyed(this);
    this.stores$ = this.storeAddDistributor.pipe(select(storesData));
    this.stores$.subscribe(data => {
      this.searchList = data;
      Object.assign(this.storeList, this.searchList);
      if (data) {
        data.forEach(obj => {
          obj.isChecked = false;
        });
      }
    }),
      untilDestroyed(this);
  }

  getStores() {
    const payload = {
      retailerId: this.requestSubmitBody.retailerId
    };
    this.storeAddDistributor.dispatch(new GetStores(payload));
  }

  search() {
    const list = [];
    if (this.searchText) {
      this.storeList.map(element => {
        if (
          element.StoreName.toLowerCase().indexOf(
            this.searchText.toLowerCase()
          ) !== -1
        ) {
          list.push(element);
        }
      });
      this.searchList = list;
    } else {
      this.searchList = this.storeList;
    }
  }

  selectStore(event) {
    this.checkEvent();
    if (event.detail.checked) {
      this.requestSubmitBody.storeIds.push(Number(event.detail.value));
    } else {
      const index = this.requestSubmitBody.storeIds.findIndex(element => {
        return element === Number(event.detail.value);
      });
      if (index !== -1) {
        this.requestSubmitBody.storeIds.splice(index, 1);
      }
    }
  }

  checkMaster() {
    this.stores$.subscribe(data => {
      if (data) {
        data.forEach(obj => {
          obj.isChecked = this.masterCheck;
        });
      }
    }),
      untilDestroyed(this);
  }

  checkEvent() {
    const totalItems = this.storeList.length;
    let checked = 0;
    this.storeList.map(obj => {
      if (obj.isChecked) {
        checked++;
      }
    });
    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.masterCheck = false;
    } else if (checked === totalItems) {
      // If all are checked
      this.masterCheck = true;
    } else {
      // If none is checked
      this.masterCheck = false;
    }
  }

  requestSubmit() {
    if(this.requestSubmitBody.storeIds.length === 0){
      this.alert.presentToast(this.translateService.instant('ADD_DISTRIBUTOR.REQUEST_TAB_MESSAGE_3'));
      return;
    }
    this.storeAddDistributor.dispatch(new RequestSubmit(this.requestSubmitBody));
  }
}
