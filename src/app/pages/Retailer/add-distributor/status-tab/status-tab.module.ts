import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '@app/shared';
import { StatusTabComponent } from './status-tab.component';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: StatusTabComponent
  }
];

@NgModule({
  declarations: [StatusTabComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule
  ],
  exports: [StatusTabComponent]
})
export class StatusTabModule { }
