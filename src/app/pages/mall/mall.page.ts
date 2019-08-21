import { Component, OnInit } from '@angular/core';
import { MallState, mallProductsData } from './store/mall.reducers';
import { Store, select } from '@ngrx/store';
import { PharmaProducts } from './store/mall.actions';
import { untilDestroyed } from '@app/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'pr-mall',
  templateUrl: './mall.page.html',
  styleUrls: ['./mall.page.scss']
})
export class MallPage implements OnInit {
  mallProducts: any[] = [];
  constructor(private store: Store<MallState>, private alertController: AlertController) {
    this.getMallProducts();
  }

  ngOnInit() {}

  getMallProducts() {
    this.store.dispatch(new PharmaProducts());
    this.store
      .pipe(
        select(mallProductsData),
        untilDestroyed(this)
      )
      .subscribe(state => {
        this.mallProducts = state;
      });
  }

  async add(product) {
    const alert = await this.alertController.create({
      header: 'Confirm Mapping Request',
      message: `Are you sure you want to send mapping request to ${product.StoreName}`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Yes');
          }
        }
      ]
    });

    await alert.present();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
