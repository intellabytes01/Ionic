import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-history-tab',
  templateUrl: './history-tab.page.html',
  styleUrls: ['./history-tab.page.scss'],
})
export class HistoryTabPage implements OnInit {

  tabInfo = [{name: 'my outstanding', url: 'history/tab/myoutstanding'},
  {name: 'my payments', url: 'history/tab/mypayments'}];
  constructor() {}

  ngOnInit() {
  }
}
