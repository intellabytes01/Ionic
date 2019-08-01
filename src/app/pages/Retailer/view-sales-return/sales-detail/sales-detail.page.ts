import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { untilDestroyed } from '@app/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'pr-sales-detail',
  templateUrl: './sales-detail.page.html',
  styleUrls: ['./sales-detail.page.scss'],
})
export class SalesDetailPage implements OnInit {
  salesDetails: any = [];
  statusList: any = [];
  constructor(
    public activatedRoute: ActivatedRoute,
    public iab: InAppBrowser
  ) {
  }

  ngOnInit() {
    this.salesDetails = [];
  }

  getMySalesDetails(oId) {
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
