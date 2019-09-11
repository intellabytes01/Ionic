import env from './.env';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: 'http://52.210.1.154:3000/api/v1',
  defaultLanguage: 'en-US',
  supportedLanguages: ['hi-IND', 'en-US', 'fr-FR']
};
