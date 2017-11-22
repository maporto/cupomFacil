(function () {
  'use strict';

  var core = angular.module('app.core');

  var config = {
    appErrorPrefix: '[novocupom Error] ',
    appTitle: 'Novo Cupom'
  };

  core.value('config', config);

  core.config(configure);
  core.config(configureTheme);
  core.config(configurarDatePicker);
  core.run(initializeFirebase);

  configure.$inject = ['$logProvider', 'routerHelperProvider'];
  /* @ngInject */
  function configure($logProvider, routerHelperProvider) {
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
    routerHelperProvider.configure({
      docTitle: config.appTitle + ': '
    });
  }

  /* @ngInject */
  function configurarDatePicker($mdDateLocaleProvider, moment) {
    $mdDateLocaleProvider.formatDate = function (date) {
      return moment(date).format('DD/MM/YYYY HH:mm');
    };
  }

  /* @ngInject */
  core.factory('Auth', ['$firebaseAuth',
    function ($firebaseAuth) {
      return $firebaseAuth();
    }
  ]);

  /* @ngInject */
  function initializeFirebase(firebase, FIRE_CONFIG) {
    firebase.initializeApp(FIRE_CONFIG);
  }

  configureTheme.$inject = ['$mdThemingProvider'];
  /* @ngInject */
  function configureTheme($mdThemingProvider) {
    var customPrimary = {
      '50': 'e0f5ef',
      '100': 'b3e5d7',
      '200': '80d4bc',
      '300': '4dc2a1',
      '400': '26b58c',
      '500': '00a878',
      '600': '00a070',
      '700': '009765',
      '800': '008d5b',
      '900': '007d48',
      'A100': 'aaffd5',
      'A200': '77ffbc',
      'A400': '44ffa3',
      'A700': '2aff97',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '500',
        '600',
        '700',
        '800',
        '900'
      ]
    };
    $mdThemingProvider
      .definePalette('customPrimary',
        customPrimary);

    var customAccent = {
      '50': 'e2e7e8',
      '100': 'b6c2c5',
      '200': '869a9e',
      '300': '557177',
      '400': '30525a',
      '500': '0c343d',
      '600': '0a2f37',
      '700': '08272f',
      '800': '062127',
      '900': '03151a',
      'A100': '58cfff',
      'A200': '25c1ff',
      'A400': '00acf1',
      'A700': '009ad8',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        'A100',
        'A200',
        'A400'
      ],
      'contrastLightColors': [
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'A700'
      ]
    };
    $mdThemingProvider
      .definePalette('customAccent',
        customAccent);

    var customWarn = {
      '50': 'ffece8',
      '100': 'ffcfc6',
      '200': 'ffafa0',
      '300': 'fe8e7a',
      '400': 'fe765e',
      '500': 'fe5e41',
      '600': 'fe563b',
      '700': 'fe4c32',
      '800': 'fe422a',
      '900': 'fd311c',
      'A100': 'ffffff',
      'A200': 'fffefe',
      'A400': 'ffcfcb',
      'A700': 'ffb8b2',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': [
        '700',
        '800',
        '900'
      ]
    };
    $mdThemingProvider
      .definePalette('customWarn',
        customWarn);

    var customBackground = {
      '50': 'fafaf9',
      '100': 'f3f4f0',
      '200': 'ebece7',
      '300': 'e2e4dd',
      '400': 'dcdfd5',
      '500': 'd6d9ce',
      '600': 'd1d5c9',
      '700': 'cccfc2',
      '800': 'c6cabc',
      '900': 'bcc0b0',
      'A100': 'ffffff',
      'A200': 'ffffff',
      'A400': 'ffffff',
      'A700': 'fdfff6',
      'contrastDefaultColor': 'light',
      'contrastDarkColors': [
        '50',
        '100',
        '200',
        '300',
        '400',
        '500',
        '600',
        '700',
        '800',
        '900',
        'A100',
        'A200',
        'A400',
        'A700'
      ],
      'contrastLightColors': []
    };
    $mdThemingProvider
      .definePalette('customBackground',
        customBackground);

    $mdThemingProvider.theme('default')
      .primaryPalette('customPrimary')
      .accentPalette('customAccent')
      .warnPalette('customWarn')
      .backgroundPalette('customBackground');
  }

})();
