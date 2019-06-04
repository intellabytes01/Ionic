import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pr-retailer',
  templateUrl: './retailer.page.html',
  styleUrls: ['./retailer.page.scss'],
})
export class RetailerPage implements OnInit {
  tabInfo = ['request', 'status', 'add'];
  constructor() { }

  ngOnInit() {
  }

}
