import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SimilarProductsModalPage } from './similar-products-modal.page';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: 'similar-products',
    component: SimilarProductsModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  declarations: [SimilarProductsModalPage]
})
export class SimilarProductsModalPageModule {}
