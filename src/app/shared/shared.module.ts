import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
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
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilityService } from './services/utility.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectStorePageModule } from './select-store/select-store.module';
import { SelectComponent } from './select/select.component';
import { FormsModule } from '@angular/forms';
import { SlidePage } from './slide/slide.page';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule, TranslateModule, IonicSelectableModule, FormsModule,
    NgxPermissionsModule],
  declarations: [
    LoaderComponent,
    TabsPage,
    TopLoaderPage,
    ToolbarPage,
    FooterComponent,
    HeaderComponent,
    BackButtonComponent,
    SidemenuComponent,
    SubmitButtonComponent,
    CardComponent,
    SelectComponent,
    SlidePage
  ],
  exports: [
    LoaderComponent,
    TabsPage,
    TopLoaderPage,
    ToolbarPage,
    FooterComponent,
    HeaderComponent,
    BackButtonComponent,
    SidemenuComponent,
    SubmitButtonComponent,
    CardComponent,
    SelectComponent,
    SlidePage
  ],
  providers: [AlertService, UtilityService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
