import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Route,
  CanLoad
} from '@angular/router';

import { CredentialsService } from './credentials.service';


@Injectable()
export class AuthenticationGuard implements CanLoad, CanActivate {
  constructor(
    private router: Router,
    private credentialsService: CredentialsService
  ) {}

  canLoad(route: Route): any {
    return this.isUserAuthenticate();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.isUserAuthenticate();
  }

  async isUserAuthenticate() {
    const isAuth = await this.credentialsService.getApiTokenAsync();
    if (!isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
