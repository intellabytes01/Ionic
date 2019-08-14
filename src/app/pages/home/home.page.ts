import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AuthState, selectAuthState } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core/until-destroyed';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  constructor(private store: Store<AuthState>) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // To protect you, we'll throw an error if it doesn't exist.
  }
}
