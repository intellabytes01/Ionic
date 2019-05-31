import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, ResolveStart } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'pr-toolbar',
  templateUrl: './toolbar.page.html',
  styleUrls: ['./toolbar.page.scss'],
})
export class ToolbarPage implements OnInit {
  @Input() showBackButton = false;
  title$: Observable<string>;

  constructor(private router: Router) { }

  ngOnInit() {
    // Display page title when page navigate
    this.title$ = this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      map(event => {
        let data = null;
        let route = event['state'].root;

        if (event['url'] !== '/home' && event['url'] !== '/' && event['url'] !== '/login'
        && event['url'] !== '/register' && event['url'] !== '/forgot-password') {
          this.showBackButton = true;
        } else {
          this.showBackButton = false;
        }

        while (route) {
          data = route.data || data;
          route = route.firstChild;
        }

        return data.title;
      }),
    );

  }

}
