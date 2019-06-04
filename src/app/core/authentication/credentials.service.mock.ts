import { Credentials } from './credentials.service';

export class MockCredentialsService {
  credentials: Credentials | null = {
    username: 'test',
    token: '123',
    data: {}
  };

  isAuthenticated(): boolean {
    return !!this.credentials;
  }

// tslint:disable-next-line: variable-name
  setCredentials(credentials?: Credentials, _remember?: boolean) {
    this.credentials = credentials || null;
  }
}
