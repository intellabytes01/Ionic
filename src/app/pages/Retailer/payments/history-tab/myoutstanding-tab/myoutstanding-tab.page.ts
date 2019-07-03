import { Component, OnInit } from '@angular/core';
import * as fromModel from '../../../feedback/feedback-data.json';

@Component({
  selector: 'app-myoutstanding-tab',
  templateUrl: './myoutstanding-tab.page.html',
  styleUrls: ['./myoutstanding-tab.page.scss'],
})
export class MyoutstandingTabPage implements OnInit {

  toStoreIds: any[] = fromModel.toStoreIds;
  constructor() { }

  ngOnInit() {
  }

}
