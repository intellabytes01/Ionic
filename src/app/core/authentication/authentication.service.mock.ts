import { Observable, of } from 'rxjs';

import { LoginContext } from './authentication.service';
import { Credentials } from './credentials.service';

export class MockAuthenticationService {
  credentials: Credentials | null = {
    username: 'test',
    token: '123',
    data: {}
  };

  login(context: LoginContext): Observable<Credentials> {
    return of({
      username: context.username,
      token: '123456',
      data: {}
    });
  }

  logout(): Observable<boolean> {
    this.credentials = null;
    return of(true);
  }
}
