import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

export interface Credentials {
  // Customize received credentials here
  username: string;
  token: string;
  data: object;
}

const credentialsKey = 'credentials';

/**
 * Provides storage for authentication credentials.
 * The Credentials interface should be replaced with proper implementation.
 */
@Injectable()
export class CredentialsService {
// tslint:disable-next-line: variable-name
  private _credentials: Credentials | null = null;

  constructor(private storage: Storage) {
    this.getApiTokenAsync();
    // const savedCredentials = sessionStorage.getItem(credentialsKey) || localStorage.getItem(credentialsKey);
    // if (savedCredentials) {
    //   this._credentials = JSON.parse(savedCredentials);
    // }
  }

  getApiTokenAsync() {
    if (!!this.credentials) {
      return !!this.credentials;
    }
    return this.storage.get(credentialsKey).then((val) => {
          if (val) {
            this._credentials = JSON.parse(val);
            return true;
          }
        });
  }

  // async getApiTokenAsync() {
  //   if (!!this.credentials) {
  //     return !!this.credentials;
  //   } else {
  //   await this.storage.get(credentialsKey).then((val) => {
  //     if (val) {
  //       this._credentials = JSON.parse(val);
  //     }
  //   });
  // }
  // }


  /**
   * Checks is the user is authenticated.
   * @return True if the user is authenticated.
   */
  isAuthenticated(): boolean {
    return !!this.credentials;
  }

  /**
   * Gets the user credentials.
   * @return The user credentials or null if the user is not authenticated.
   */
  get credentials(): Credentials | null {
    return this._credentials;
  }

  /**
   * Sets the user credentials.
   * The credentials may be persisted across sessions by setting the `remember` parameter to true.
   * Otherwise, the credentials are only persisted for the current session.
   * @param credentials The user credentials.
   * @param remember True to remember credentials across sessions.
   */
  setCredentials(credentials?: Credentials, remember?: boolean) {
    this._credentials = credentials || null;

    if (credentials) {
      this.storage.set(credentialsKey, JSON.stringify(credentials));
    } else {
      this.storage.remove(credentialsKey);
    }


    // if (credentials) {
    //   const storage = remember ? localStorage : sessionStorage;
    //   storage.setItem(credentialsKey, JSON.stringify(credentials));
    // } else {
    //   sessionStorage.removeItem(credentialsKey);
    //   localStorage.removeItem(credentialsKey);
    // }
  }
}
