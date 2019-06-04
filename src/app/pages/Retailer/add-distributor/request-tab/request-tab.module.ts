import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { RequestTabComponent } from './request-tab.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: RequestTabComponent
  }
];

@NgModule({
  declarations: [RequestTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RequestTabComponent]
})
export class RequestTabModule { }
