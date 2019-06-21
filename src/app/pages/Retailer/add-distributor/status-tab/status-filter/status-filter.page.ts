import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'pr-status-filter',
  templateUrl: './status-filter.page.html',
  styleUrls: ['./status-filter.page.scss'],
})
export class StatusFilterPage implements OnInit {

  statusList: any[] = ['Mapped', 'Pending', 'Not Mapped', 'Contact Dist'];
  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }

}
