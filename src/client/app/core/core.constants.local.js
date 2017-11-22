/* global toastr:false, moment:false */
(function() {
  'use strict';

  angular
    .module('app.core')
    .constant('moment', moment)
    .constant('FIRE_CONFIG', {
      apiKey: "AIzaSyDObA1il3vu4ryejlSoXpG8StdnSWg3pXA",
      authDomain: "cupomfacilteste.firebaseapp.com",
      databaseURL: "https://cupomfacilteste.firebaseio.com",
      projectId: "cupomfacilteste",
      storageBucket: "cupomfacilteste.appspot.com",
      messagingSenderId: "101512374868"
    });
})();
