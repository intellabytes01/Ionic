import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ResolveStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'pr-toolbar',
  templateUrl: './toolbar.page.html',
  styleUrls: ['./toolbar.page.scss']
})
export class ToolbarPage implements OnInit {
  @Input() showBackButton = false;
  showHeader = false;
  title$: Observable<string>;
  backUrl = '/dashboard';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    private translateService: TranslateService
  ) {}

  async share() {
    const alert = await this.alertCtrl.create({
      header: this.translateService.instant('TOOLBAR.POPUP_HEADER'),
      message: this.translateService.instant('TOOLBAR.POPUP_MESSAGE'),
      buttons: [
        {
          text: this.translateService.instant('TOOLBAR.DISTRIBUTOR'),
          cssClass: 'blue-color',
          handler: () => {
            this.socialSharing
              .share(
                this.translateService.instant(
                  'TOOLBAR.INVITE_MESSAGE_DISTRIBUTOR'
                )
              )
              .then(() => {
                console.log('success');
              })
              .catch(e => {
                console.log('share error: ', e);
              });
          }
        },
        {
          text: this.translateService.instant('TOOLBAR.RETAILER'),
          cssClass: 'blue-color',
          handler: () => {
            this.socialSharing
              .share(
                this.translateService.instant('TOOLBAR.INVITE_MESSAGE_RETAILER')
              )
              .then(() => {
                console.log('success');
              })
              .catch(e => {
                console.log('share error: ', e);
              });
          }
        }
      ]
    });

    alert.present();
  }

  ngOnInit() {
    // Display page title when page navigate
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      map(event => {
        let data = null;
        let route = event['state'].root;

        // Back Button Url
        if (event['url'].split('?')[0] === '/myorder/my-order-details') {
          this.backUrl = '/myorder';
        } else {
          this.backUrl = '/dashboard';
        }

        if (
          event['url'] !== '/' &&
          event['url'] !== '/dashboard' &&
          event['url'] !== '/login' &&
          event['url'] !== '/register' &&
          event['url'] !== '/forgot-password'
        ) {
          this.showHeader = true;
          if (event['url'] !== '/dashboard' || event['url'] !== '/') {
            this.showBackButton = true;
          } else {
            this.showBackButton = false;
          }
        } else {
          this.showHeader = false;
          this.showBackButton = false;
        }
        while (route) {
          data = route.data || data;
          route = route.firstChild;
        }

        return data.title;
      })
    );
  }
}
