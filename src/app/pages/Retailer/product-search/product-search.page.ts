import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.page.html',
  styleUrls: ['./product-search.page.scss']
})
export class ProductSearchPage implements OnInit {
  tabInfo = ['product', 'generic', 'company', 'distributor'];
  constructor() {}

  ngOnInit() {}
}
