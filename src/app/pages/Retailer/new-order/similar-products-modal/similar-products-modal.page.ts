import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'pr-similar-products-modal',
  templateUrl: './similar-products-modal.page.html',
  styleUrls: ['./similar-products-modal.page.scss'],
})
export class SimilarProductsModalPage implements OnInit {

  title = 'Similar Products Modal';
  similarProducts: any[] = [];
  selectedProducts: any[] = [];
  constructor(public modalController: ModalController, private navParams: NavParams) { }

  add() {
    this.similarProducts.forEach((element) => {
      if (element.Quantity) {
        this.selectedProducts.push(element);
      }
    });
    this.modalController.dismiss({selectedProducts: this.selectedProducts});
  }

  ngOnInit() {
    this.title = this.navParams.get('title');
    if (this.navParams.get('similarProductList')) {
      this.similarProducts = this.navParams.get('similarProductList');
    }
  }

  setQuantity(product, val) {
    product['Quantity'] = val.target.value;
  }

}
