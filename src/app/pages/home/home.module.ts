import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { QuoteService } from './quote.service';
import { SharedModule } from '@app/shared';
import { AuthenticationGuard } from '@app/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        canActivate: [AuthenticationGuard],
        data: {title: 'Home'}
      }
    ])
  ],
  declarations: [HomePage],
  providers: [QuoteService]
})
export class HomePageModule {}
