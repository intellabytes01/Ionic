import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CredentialsService } from './credentials.service';


@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private credentialsService: CredentialsService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // if (!this.credentialsService.isAuthenticated()) {
    //   if (this.credentialsService.getApiTokenAsync()) {
    //     if (!this.credentialsService.isAuthenticated()) {
    //     this.router.navigateByUrl('/login');
    //     return false;
    //     }
    //   }
    // }
    // if (!this.isUserAuthenticate()) {
    //   this.router.navigateByUrl('/login');
    //   return false;
    // }
    // return true;
    return this.isUserAuthenticate();
  }

  async isUserAuthenticate() {
    const isAuth = await this.credentialsService.getApiTokenAsync() as boolean;
    // this.credentialsService.setCredentials(isAuth as Credentials);
    console.log(isAuth);
    if (!isAuth) {
      this.router.navigateByUrl('/login');
      return false;
    } else {
      return true;
    }
  }
}
