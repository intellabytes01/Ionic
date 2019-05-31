import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './loader/loader.component';
import { TabsPage } from './tabs/tabs.page';
import { TopLoaderPage } from './top-loader/top-loader.page';
import { ToolbarPage } from './toolbar/toolbar.page';
import { BackButtonComponent } from './back-button/back-button.component';
import { AlertService } from './services/alert.service';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule],
  declarations: [LoaderComponent, TabsPage, TopLoaderPage, ToolbarPage, BackButtonComponent],
  exports: [LoaderComponent, TabsPage, TopLoaderPage, ToolbarPage, BackButtonComponent],
  providers: [AlertService]
})
export class SharedModule {}
