import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route
} from '@angular/router';

import { CredentialsService } from './credentials.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  canLoad(route: Route): boolean {
    const url: string = route.path;
    if (this.isUserAuthenticate()) {
      return true;
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isUserAuthenticate();
  }

  async isUserAuthenticate() {
    const isAuth = (await this.credentialsService.getApiTokenAsync()) as boolean;
    if (!isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
