import { Directive, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Logger } from '@app/core';
import { Plugins } from '@capacitor/core';

const log = new Logger('ClickGuard');

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[pr-retailer-analytics]'
})
export class ClickDirective implements OnInit {
  constructor(
    public router: Router,
    public platform: Platform
  ) {}

  ngOnInit() {}

  @HostListener('click', ['$event'])
  clickEvent(event) {
    console.log(event);
    // Button
    if (event.srcElement.innerText) {
      this.logClick(event.srcElement.innerText, this.router.url);
    } else if (event.srcElement.form && event.srcElement.form.innerText) {
      this.logClick(event.srcElement.form.innerText, this.router.url);
    } else if (
      event.srcElement.parentElement &&
      event.srcElement.parentElement.textContent
    ) {
      this.logClick(
        event.srcElement.parentElement.textContent,
        this.router.url
      );
    }
  }

  logClick(controlName: string, route: any) {
    if (this.platform.is('cordova')) {
      const data = { name: 'page_view', parameters: { user_id: '8', control: controlName, page: route } };
      console.log(data);
      Plugins.CapacitorFirebaseAnalytics
        .logEvent(data)
        .then((res: any) => console.log(res))
        .catch((error: any) => console.error(error));
    }
  }
}
