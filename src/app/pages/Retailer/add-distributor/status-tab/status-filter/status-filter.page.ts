import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'pr-status-filter',
  templateUrl: './status-filter.page.html',
  styleUrls: ['./status-filter.page.scss']
})
export class StatusFilterPage implements OnInit {
  statusList: any[] = ['Mapped', 'Pending', 'Not Mapped', 'Contact Dist'];
  selectedStatus: string;

  constructor(public modalController: ModalController, private navParams: NavParams) {}

  ngOnInit() {
    console.log(this.navParams.get('value'));
    this.selectedStatus = this.navParams.get('value');
  }

  filterStatus() {
    this.modalController.dismiss(this.selectedStatus);
  }
}
