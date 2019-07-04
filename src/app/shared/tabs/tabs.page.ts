import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';

@Component({
  selector: 'pr-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
 @Input() tabInfo: any[];
 activeTab: string;

  constructor() { }

  ngOnInit() {
    this.activeTab = this.tabInfo[0];
  }

  setActiveTab(tab){
    this.activeTab = tab;
  }

}
