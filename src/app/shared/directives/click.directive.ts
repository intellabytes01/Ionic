import { Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Logger } from '@app/core';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics/ngx';

const log = new Logger('ClickGuard');

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[pr-retailer-analytics]'
})
export class ClickDirective implements OnInit {
  constructor(
    public router: Router,
    public platform: Platform,
    private firebaseAnalytics: FirebaseAnalytics
  ) {}

  ngOnInit() {}

  @HostListener('click', ['$event'])
  clickEvent(event) {
    console.log(event);
    // Button
    if (event.srcElement.innerText) {
      this.logClick(event.srcElement.innerText, this.router.url);
    }
    // Input
    else if (event.srcElement.form && event.srcElement.form.innerText) {
      this.logClick(event.srcElement.form.innerText, this.router.url);
    }
    // Selectable
    else if (
      event.srcElement.parentElement &&
      event.srcElement.parentElement.textContent
    ) {
      this.logClick(
        event.srcElement.parentElement.textContent,
        this.router.url
      );
    }
  }

  logClick(name: string, value: any) {
    if (this.platform.is('cordova')) {
      const data = { user_id: '8', controlName: name, page: value };
      log.info(data, 'page_view');
      this.firebaseAnalytics
        .logEvent('page_view', data)
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error));
    }
  }
}
