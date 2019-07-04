import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.page.html',
  styleUrls: ['./payments.page.scss']
})
export class PaymentsPage implements OnInit {
  tabInfo = ['pay later', 'make payment', 'history'];
  constructor() {}

  ngOnInit() {
  }
}
