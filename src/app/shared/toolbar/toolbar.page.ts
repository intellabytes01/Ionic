import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ResolveStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

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

  constructor(private router: Router) {
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
