import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'app-draft-order',
  templateUrl: './draft-order.page.html',
  styleUrls: ['./draft-order.page.scss'],
})
export class DraftOrderPage implements OnInit {

  tabInfo = ['draft', 'confirmed', 'deleted'];
  placeholder = '';
  constructor() {}

  ngOnInit() {
  }
}
