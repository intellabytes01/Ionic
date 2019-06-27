import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'pr-similar-products-modal',
  templateUrl: './similar-products-modal.page.html',
  styleUrls: ['./similar-products-modal.page.scss'],
})
export class SimilarProductsModalPage implements OnInit {

  title: string = 'Similar Products Modal';
  constructor(public modalController: ModalController, private navParams: NavParams) { }

  add() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.title = this.navParams.get('title');
  }

}
