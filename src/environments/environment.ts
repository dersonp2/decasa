// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API_URL: 'https://sistemadecasa.com.br',
  // API_URL: 'http://homologacao.sistemadecasa.com.br',
  // http://localhost:8080/v1/rest/decasa/
  API_URL: '/v1/rest/decasa',
  API_MAPS: 'https://maps.googleapis.com/maps/api/geocode/json',
  ACESS_TOKEN: 'G416F208V208U416V1196D780E416U1196Y884W416H1144H1196H364H676X780K936G416G936V832O416G416C416V1144H1196H',
  CEP_URL: 'https://viacep.com.br/ws',
  KEY_MAPS: 'AIzaSyAofSgPCKs-NUy2_AVLw-opQiPm75wR030'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
