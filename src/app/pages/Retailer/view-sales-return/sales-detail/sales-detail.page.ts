import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { Store, select } from '@ngrx/store';
import { SalesReturnState } from '../store/view-sales-return.state';
import { SalesReturnDetails } from '../store/view-sales-return.actions';
import { salesReturnDetailsData } from '../store/view-sales-return.reducers';

@Component({
  selector: 'pr-sales-detail',
  templateUrl: './sales-detail.page.html',
  styleUrls: ['./sales-detail.page.scss'],
})
export class SalesDetailPage implements OnInit {
  salesDetails: any = {};
  statusList: any = [];
  state$: Observable<object>;
  constructor(
    public activatedRoute: ActivatedRoute,
    public iab: InAppBrowser,
    private salesReturnStore: Store<SalesReturnState>
  ) {
  }

  ngOnInit() {
    this.state$ = this.activatedRoute.paramMap.pipe(
      map(() => window.history.state)
    );
    this.state$.pipe(untilDestroyed(this)).subscribe((data: any) => {
      if (data.data) {
        this.getMySalesDetails(data.data);
      }
    });
    this.salesReturnStore.select(salesReturnDetailsData, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.salesDetails = state;
      },
      e => { }
    );
  }

  getMySalesDetails(id) {
    let payload = {
      salesreturnId: id
    }
    this.salesReturnStore.dispatch(new SalesReturnDetails(payload));
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
