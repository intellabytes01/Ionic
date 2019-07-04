import { Component, OnInit } from '@angular/core';
import * as fromModel from '../../feedback/feedback-data.json';

@Component({
  selector: 'app-paylater-tab',
  templateUrl: './paylater-tab.page.html',
  styleUrls: ['./paylater-tab.page.scss'],
})
export class PaylaterTabPage implements OnInit {

  toStoreIds: any[] = fromModel.toStoreIds;
  constructor() { }

  ngOnInit() {
  }

}
