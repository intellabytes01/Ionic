import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: LandingPageComponent
      }
    ])
  ]
})
export class LandingPageModule { }
