import { Component, OnInit } from '@angular/core';
import { MallState, mallProductsData } from './store/mall.reducers';
import { Store, select } from '@ngrx/store';
import { PharmaProducts } from './store/mall.actions';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'pr-mall',
  templateUrl: './mall.page.html',
  styleUrls: ['./mall.page.scss']
})
export class MallPage implements OnInit {
  mallProducts: any[] = [];
  constructor(private store: Store<MallState>) {
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

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}
}
