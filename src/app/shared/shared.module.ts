import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { LoaderComponent } from './loader/loader.component';
import { TabsPage } from './tabs/tabs.page';
import { TopLoaderPage } from './top-loader/top-loader.page';
import { ToolbarPage } from './toolbar/toolbar.page';
import { BackButtonComponent } from './back-button/back-button.component';
import { AlertService } from './services/alert.service';
import { RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SubmitButtonComponent } from './submit-button/submit-button.component';
import { SkeletonLoaderComponent } from './skeleton-loader/skeleton-loader.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilityService } from './services/utility.service';
import { BusinessTypesPage } from './business-types/business-types.page';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectStorePage } from './select-store/select-store.page';

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule, TranslateModule, IonicSelectableModule],
  declarations: [
    LoaderComponent,
    TabsPage,
    TopLoaderPage,
    ToolbarPage,
    SkeletonLoaderComponent,
    FooterComponent,
    HeaderComponent,
    BackButtonComponent,
    SidemenuComponent,
    SubmitButtonComponent,
    CardComponent,
    BusinessTypesPage,
    SelectStorePage
  ],
  exports: [
    LoaderComponent,
    TabsPage,
    TopLoaderPage,
    ToolbarPage,
    SkeletonLoaderComponent,
    FooterComponent,
    HeaderComponent,
    BackButtonComponent,
    SidemenuComponent,
    SubmitButtonComponent,
    CardComponent,
    BusinessTypesPage,
    SelectStorePage
  ],
  providers: [AlertService, UtilityService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
