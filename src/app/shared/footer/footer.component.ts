import { Component, OnInit, OnDestroy } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  constructor(
    public iab: InAppBrowser,
    public router: Router,
    public storage: Storage
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  navigate() {
    this.storage.get('credentials').then(val => {
      if (val) {
        this.router.navigateByUrl('/feedback');
      } else {
        this.iab.create('mailto:care@pharmarack.com', '_system');
      }
    });
  }
}
