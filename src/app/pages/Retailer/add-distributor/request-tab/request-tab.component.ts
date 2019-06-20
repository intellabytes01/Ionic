import { Component, OnInit } from '@angular/core';
import {
  AuthState,
  selectAuthState
} from '@app/core/authentication/auth.states';
import { Store, select } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { AddDistributorState } from '../store/add-distributor.state';
import { storesData } from '../store/add-distributor.reducers';
import { GetStores } from '../store/add-distributor.actions';

@Component({
  selector: 'app-request-tab',
  templateUrl: './request-tab.component.html',
  styleUrls: ['./request-tab.component.scss']
})
export class RequestTabComponent implements OnInit {
  searchList: any[] = [];
  tempList: any[] = [];
  searchText = '';
  stores$: any;
  requestSubmitBody: any = {
    retailerId: null,
    userId: null,
    storeIds: []
  };
  isIndeterminate: boolean;
  masterCheck = false;
  constructor(
    private storeAuth: Store<AuthState>,
    private storeAddDistributor: Store<AddDistributorState>
  ) {}

  ngOnInit() {
    this.storeAuth.pipe(select(selectAuthState)).subscribe(data => {
      this.getStores(data['userData']['userData']['userSummary']['UserId']);
    }),
      untilDestroyed(this);
    this.stores$ = this.storeAddDistributor.pipe(select(storesData));
    this.stores$.subscribe((data) => {
      console.log(data);
      this.searchList = data;
      Object.assign(this.tempList, this.searchList);
      if (data) {
        data.forEach(obj => {
          obj.isChecked = false;
        });
      }
    }),
    untilDestroyed(this);
  }

  getStores(retailerId) {
    const payload = {
      retailerId: 3
    };
    this.storeAddDistributor.dispatch(new GetStores(payload));
  }

  search() {
    const list = [];
    if (this.searchText) {
      this.tempList.map((element) => {
        if (element.StoreName.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1) {
          list.push(element);
        }
      });
      this.searchList = list;
      console.log(this.searchList);
    } else {
      this.searchList = this.tempList;
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
    console.log(this.requestSubmitBody.storeIds);
  }

  checkMaster() {
    setTimeout(() => {
      this.stores$.subscribe((data) => {
        console.log(data);
        if (data) {
          data.forEach(obj => {
            obj.isChecked = this.masterCheck;
          });
        }
      }),
      untilDestroyed(this);
    });
  }

  checkEvent() {
    const totalItems = this.requestSubmitBody.storeIds.length;
    let checked = 0;
    this.requestSubmitBody.storeIds.map(obj => {
      if (obj.isChecked) { checked++; }
    });
    if (checked > 0 && checked < totalItems) {
      // If even one item is checked but not all
      this.masterCheck = false;
    } else if (checked == totalItems) {
      // If all are checked
      this.masterCheck = true;
    } else {
      // If none is checked
      this.masterCheck = false;
    }
  }

  requestSubmit() {}
}
