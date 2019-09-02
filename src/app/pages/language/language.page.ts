import { Component, OnInit } from '@angular/core';
import { I18nService } from '@app/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'pr-language',
  templateUrl: './language.page.html',
  styleUrls: ['./language.page.scss'],
})
export class LanguagePage implements OnInit {

  constructor(private i18nService: I18nService, private platform: Platform) { }

  ngOnInit() {
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngOnDestroy() {}

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get isWeb(): boolean {
    return !this.platform.is('cordova');
  }

}
