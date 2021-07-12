// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  contractHash: "0xa2467a0a29e2cae6d5e25bfdb94cc4dd19ca3021",
  amazonPrivateKey: "e345c148e77fafa8326e087acac6ae97ca57a262d7653964b6cfa9870a2b0a9f",
  nodeURL : "http://localhost:50012/",
  consumerWallet:"8ed68644f629dc0fa1b25ff27ecf6a09e37ded8142e22d31e5e790152b3a08c2", //steve
 //consumerWallet:"e345c148e77fafa8326e087acac6ae97ca57a262d7653964b6cfa9870a2b0a9f", //Amazon
  networkMagic : 2106651775
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
