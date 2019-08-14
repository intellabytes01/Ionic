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
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { TranslateModule } from '@ngx-translate/core';
import { UtilityService } from './services/utility.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { SelectComponent } from './select/select.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlidePage } from './slide/slide.page';
import { NgxPermissionsModule } from 'ngx-permissions';
import { ShowHideInputDirective } from './directives/show-hide-input.directive';
import { EqualValidatorDirective } from './directives/equal-validator.directive';
import { DisableControlDirective } from './directives/disable-control.directive';
import { ModalPopupPage } from './modal-popup/modal-popup.page';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { NewOrderButtonComponent } from './new-order-button/new-order-button.component';
import { SearchComponent } from './search/search.component';
import { ClickDirective } from './directives/click.directive';

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule, TranslateModule, IonicSelectableModule, FormsModule,
    NgxPermissionsModule, ReactiveFormsModule],
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
    SlidePage,
    ShowHideInputDirective,
    EqualValidatorDirective,
    DisableControlDirective,
    ModalPopupPage,
    NewOrderButtonComponent,
    SearchComponent,
    ClickDirective
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
    SlidePage,
    ShowHideInputDirective,
    EqualValidatorDirective,
    DisableControlDirective,
    ModalPopupPage,
    NewOrderButtonComponent,
    SearchComponent,
    ClickDirective
  ],
  entryComponents: [ModalPopupPage],
  providers: [AlertService, UtilityService, ImagePicker],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SharedModule {}
