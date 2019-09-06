import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ProfileState } from '@app/pages/Retailer/profile/store/profile.reducers';
import { getUserId } from '@app/core/authentication/auth.states';
import { untilDestroyed } from '@app/core';
import {
  BusinessTypes,
  Regions,
  GetProfileDetails
} from '@app/pages/Retailer/profile/store/profile.actions';

@Component({
  selector: 'pr-refresh',
  templateUrl: './refresh.component.html',
  styleUrls: ['./refresh.component.scss']
})
export class RefreshComponent implements OnInit, OnDestroy {
  userId: string;
  constructor(
    private router: Router,
    private storeProfile: Store<ProfileState>
  ) {}

  ngOnInit() {}

  ngOnDestroy() {}

  doRefresh(event) {
    console.log('Begin async operation: ', this.router.url);

    if (this.router.url === '/profile') {
      this.getBusinessTypes();
      this.getRegions();
      this.getProfileDetails();
    }
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 1000);
  }

  // Profile

  getBusinessTypes() {
    this.storeProfile.dispatch(new BusinessTypes());
  }

  getRegions() {
    this.storeProfile.dispatch(new Regions());
  }

  getProfileDetails() {
    this.storeProfile
      .pipe(
        select(getUserId),
        untilDestroyed(this)
      )
      .subscribe(userId => {
        this.storeProfile.dispatch(new GetProfileDetails(userId));
      });
  }
}
