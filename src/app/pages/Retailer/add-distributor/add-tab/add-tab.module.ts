import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTabComponent } from './add-tab.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: AddTabComponent
  }
];

@NgModule({
  declarations: [AddTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  exports: [AddTabComponent]
})
export class AddTabModule { }
