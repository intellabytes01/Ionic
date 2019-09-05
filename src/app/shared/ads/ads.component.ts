import { Component, OnInit, Input } from '@angular/core';
import { AdsService } from './ads.service';
import { AuthState, getUserId } from '@app/core/authentication/auth.states';
import { Store } from '@ngrx/store';
import { untilDestroyed } from '@app/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'pr-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss']
})
export class AdsComponent implements OnInit {
  @Input() slide = false;
  userId: string;
  adList: any[];
  slideOpts = {
    initialSlide: 1,
    speed: 400,
    direction: 'horizontal',
    autoplay: true,
    pagination: false
  };
  constructor(
    private adsService: AdsService,
    private authStore: Store<AuthState>,
    private domSanitizer: DomSanitizer,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.authStore.select(getUserId, untilDestroyed(this)).subscribe(
      (state: any) => {
        this.userId = state;
        this.getAds();
      },
      e => {}
    );
  }

  getAds() {
    const payload = {
      userId: this.userId,
      productId: '96139',
      slotId: 3
    };
    this.adsService.getAdsList(payload).subscribe(
      data => {
        console.log(data);
        this.adList = data.data;
        console.log(this.platform.is('mobile'));
        console.log(this.platform.is('tablet'));
        console.log(this.platform.is('desktop'));
      },
      err => {}
    );
  }
}
