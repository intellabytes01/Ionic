import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '@app/pages/Retailer/profile/store/profile.reducers';
import {
  getUserId,
  AuthState,
  selectAuthState,
  getRegionId
} from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import {
  BusinessTypes,
  Regions,
  GetProfileDetails
} from '@app/pages/Retailer/profile/store/profile.actions';
import { AddDistributorState } from '@app/pages/Retailer/add-distributor/store/add-distributor.reducers';
import {
  GetStores,
  GetStatus
} from '@app/pages/Retailer/add-distributor/store/add-distributor.actions';
import { FeedbackState } from '@app/pages/Retailer/feedback/store/feedback.reducers';
import { FeedbackTypes } from '@app/pages/Retailer/feedback/store/feedback.actions';
import { format, subDays } from 'date-fns';
import { MyOrderState } from '@app/pages/my-order/store/myOrder.reducers';
import { MyOrderList } from '@app/pages/my-order/store/myOrder.actions';
import { SchemesState } from '@app/pages/Retailer/schemes/store/schemes.state';
import { Schemes } from '@app/pages/Retailer/schemes/store/schemes.actions';
import { InvoiceState } from '@app/pages/Retailer/my-invoices/store/my-invoices.state';
import { InvoiceList } from '@app/pages/Retailer/my-invoices/store/my-invoices.actions';
import { DeliveryTrackerState } from '@app/pages/Retailer/delivery-tracker/store/delivery-tracker.state';
import { DeliveryTracker } from '@app/pages/Retailer/delivery-tracker/store/delivery-tracker.actions';
import { MallState } from '@app/pages/mall/store/mall.reducers';
import { PharmaProducts } from '@app/pages/mall/store/mall.actions';
import { NotificationList } from '@app/pages/notification/store/notification.actions';
import { NotificationState } from '@app/pages/notification/store/notification.state';
import { SalesReturnState } from '@app/pages/Retailer/view-sales-return/store/view-sales-return.state';
import { SalesReturnList } from '@app/pages/Retailer/view-sales-return/store/view-sales-return.actions';

@Component({
  selector: 'pr-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit, OnDestroy {
  userId: string;
  retailerId: number;
  regionId: number;
  constructor(
    private router: Router,
    private storeProfile: Store<ProfileState>,
    private storeAddDistributor: Store<AddDistributorState>,
    private storeAuth: Store<AuthState>,
    private storeFeedback: Store<FeedbackState>,
    private storeMyOrder: Store<MyOrderState>,
    private storeSchemes: Store<SchemesState>,
    private storeInvoice: Store<InvoiceState>,
    private storeDeliveryTracker: Store<DeliveryTrackerState>,
    private storeMall: Store<MallState>,
    private storeNotification: Store<NotificationState>,
    private salesReturnStore: Store<SalesReturnState>
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  doRefresh(event) {
    console.log('Begin async operation: ', this.router.url);

    if (this.router.url === '/profile') {
      this.getBusinessTypes();
      this.getRegions();
      this.getProfileDetails();
    }
    if (this.router.url === '/add-distributor/tab/request') {
      this.getRetailerId();
      this.getStoresRequestTab();
    }
    if (this.router.url === '/add-distributor/tab/status') {
      this.getRetailerId();
      this.getStatusListStatusTab();
    }
    if (this.router.url === '/feedback') {
      this.getFeedbackTypes();
    }
    if (this.router.url === '/myorder') {
      this.getMyOrders();
    }
    if (this.router.url === '/schemes') {
      this.getRegionId();
      this.getSchemes();
    }
    if (this.router.url === '/my-invoices') {
      this.getMyInvoices();
    }
    if (this.router.url === '/delivery-tracker') {
      this.getDeliveryList();
    }
    if (this.router.url === '/mall') {
      this.getMallProducts();
    }
    if (this.router.url === '/notification') {
      this.getUserId();
      this.getNotificationList();
    }

    if (this.router.url === '/view-sales-return') {
      this.getSalesReturnList();
    }

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  getRetailerId() {
    this.storeAuth
      .pipe(
        select(selectAuthState),
        untilDestroyed(this)
      )
      .subscribe(async data => {
        this.retailerId =
          data['userData']['userData']['retailerSummary']['retailerInfo'][
            'RetailerId'
          ];
      });
  }

  getRegionId() {
    this.storeAuth.select(getRegionId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.regionId = state;
      },
      e => {}
    );
  }

  getUserId() {
    this.storeAuth.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
      },
      e => {}
    );
  }

  // Profile

  getBusinessTypes() {
    this.storeProfile.dispatch(new BusinessTypes());
  }

  getRegions() {
    this.storeProfile.dispatch(new Regions());
  }

  getProfileDetails() {
    this.storeProfile
      .pipe(
        select(getUserId),
        untilDestroyed(this)
      )
      .subscribe(userId => {
        this.storeProfile.dispatch(new GetProfileDetails(userId));
      });
  }

  // Add Distributor

  async getStoresRequestTab() {
    const payload = {
      retailerId: this.retailerId
    };
    this.storeAddDistributor.dispatch(new GetStores(payload));
  }

  getStatusListStatusTab() {
    const payload = {
      retailerId: this.retailerId
    };
    this.storeAddDistributor.dispatch(new GetStatus(payload));
  }

  // Feedback

  getFeedbackTypes() {
    this.storeFeedback.dispatch(new FeedbackTypes());
  }

  // My Order

  getMyOrders() {
    const payload = {
      orderDetails: {
        fromDate: '',
        toDate: '',
        operation: 'view',
        status: 'all',
        pagination: {
          currentPage: 1,
          limit: 15,
          maxDateTime: format(subDays(new Date(), 7), 'YYYY-MM-DD HH:mm:ss')
        }
      }
    };
    this.storeMyOrder.dispatch(new MyOrderList(payload));
  }

  // Schemes

  getSchemes() {
    const payload = {
      regionId: this.regionId
    };
    this.storeSchemes.dispatch(new Schemes(payload));
  }

  // Invoices

  getMyInvoices() {
    const payload = {
      storeId: '151',
      partyCode: '60917'
    };
    this.storeInvoice.dispatch(new InvoiceList(payload));
  }

  // Delivery Tracker

  getDeliveryList() {
    const payload = {
      fromDate: '',
      toDate: '',
      status: '',
      query: '',
      store: ''
    };
    this.storeDeliveryTracker.dispatch(new DeliveryTracker(payload));
  }

  // Pharma Mall

  getMallProducts() {
    this.storeMall.dispatch(new PharmaProducts());
  }

  // Notification

  getNotificationList() {
    const payload = {
      userId: this.userId
    };
    this.storeNotification.dispatch(new NotificationList(payload));
  }

  // View Sales Return

  getSalesReturnList() {
    const payload = {
      fromDate: '',
      toDate: '',
      query: '',
      store: '',
      type: ''
    };
    this.salesReturnStore.dispatch(new SalesReturnList(payload));
  }
}
