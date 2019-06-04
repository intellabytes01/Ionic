import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Events } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BusinessTypeState, selectBusinessTypeState } from './business-types.states';
import { GetBusinessType } from './actions/business-types.actions';

@Component({
  selector: 'pr-business-types',
  templateUrl: './business-types.page.html',
  styleUrls: ['./business-types.page.scss'],
})
export class BusinessTypesPage implements OnInit {

// tslint:disable-next-line: no-input-rename
  @Input('selectedForm') selectedForm: FormGroup;
  businessTypes: any[] = [];
  businesstypeStore: any;
  constructor(private events: Events, private store: Store<BusinessTypeState>) { }

  ngOnInit() {
    this.store.dispatch(new GetBusinessType());
    // this.businesstypeStore = this.store
    //   .select(selectBusinessTypeState)
    //   .subscribe((state: any) => {
    //     this.businessTypes = state;
    //   });
  }

  trackByFn(index, item) {
    return index;
  }

  valueChange(value) {
    this.events.publish('businessTypeChange', value.value);
  }

}
