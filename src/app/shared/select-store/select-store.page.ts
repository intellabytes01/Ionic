import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-select-store',
  templateUrl: './select-store.page.html',
  styleUrls: ['./select-store.page.scss'],
})
export class SelectStorePage implements OnInit {

  stores: any[] = [{storeId: '1', storeName: 'Demo Store 1'}];
  storeSelected = '';
  constructor() { }

  ngOnInit() {}

}
