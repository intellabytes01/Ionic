import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { TopLoaderService } from './top-loader.service';
import { untilDestroyed } from '@app/core';
import { startWith, delay, tap } from 'rxjs/operators';

@Component({
  selector: 'pr-top-loader',
  templateUrl: './top-loader.page.html',
  styleUrls: ['./top-loader.page.scss']
})
export class TopLoaderPage implements OnInit, OnDestroy, AfterViewInit {
  loading: boolean;
  constructor(private topLoaderService: TopLoaderService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.topLoaderService.isLoading
        .pipe(
            // tslint:disable-next-line: deprecation
            startWith(null),
            delay(0),
            tap((value) => this.loading = value)
        ).subscribe();
  }

  // This method must be present, even if empty to use untilDestroyed
  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
