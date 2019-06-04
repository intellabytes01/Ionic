import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs';
// import { Store } from '@ngrx/store';
// import { AuthState, selectAuthState } from '@app/core/authentication/auth.states';
// import { routerNgProbeToken } from '@angular/router/src/router_module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {

  // getState: Observable<any>;
  // isAuthenticated: false;
  // user = null;
  // errorMessage = null;

  constructor(
    // private store: Store<AuthState>,
   private router: Router
    ) {
    // this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.router.navigate(['/home']);
    // this.getState.subscribe((state) => {
    //   if (state && state.isAuthenticated) {
    //     this.router.navigate(['/home']);
    //   // this.user = state.user;
    //   // this.errorMessage = state.errorMessage;
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });
  }

}
