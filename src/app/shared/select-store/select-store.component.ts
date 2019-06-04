import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-store',
  templateUrl: './select-store.component.html',
  styleUrls: ['./select-store.component.scss'],
})
export class SelectStoreComponent implements OnInit {

  stores: any[] = [{storeId: '1', storeName: 'Demo Store 1'}];
  storeSelected = '';
  constructor() { }

  ngOnInit() {}

}
