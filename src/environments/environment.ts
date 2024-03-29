// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import env from './.env';

export const environment = {
  production: false,
  version: env.npm_package_version + '-dev',
  serverUrl: 'http://52.210.1.154:3000/api/v1',
  // serverUrl: 'http://10.42.0.1:3000/api/v1',
  defaultLanguage: 'en-US',
  supportedLanguages: ['hi-IND', 'en-US', 'fr-FR']
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
