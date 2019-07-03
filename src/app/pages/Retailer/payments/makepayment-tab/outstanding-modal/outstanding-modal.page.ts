import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-outstanding-modal',
  templateUrl: './outstanding-modal.page.html',
  styleUrls: ['./outstanding-modal.page.scss'],
})
export class OutstandingModalPage implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

}
