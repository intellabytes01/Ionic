import { Component, OnInit, OnDestroy } from '@angular/core';
import { TopLoaderService } from './top-loader.service';
import { untilDestroyed } from '@app/core';

@Component({
  selector: 'pr-top-loader',
  templateUrl: './top-loader.page.html',
  styleUrls: ['./top-loader.page.scss'],
})
export class TopLoaderPage implements OnInit, OnDestroy {
  loading: boolean;
  constructor(private topLoaderService: TopLoaderService) {
    this.topLoaderService.isLoading.pipe(untilDestroyed(this)).subscribe((v) => {
      this.loading = v;
    });
   }

  ngOnInit() {
  }

  // This method must be present, even if empty to use untilDestroyed
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }

}
