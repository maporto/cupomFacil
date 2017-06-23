(function() {
  'use strict';
  angular
    .module('app.login')
    .run(configureGuard);

  /* @ngInject */
  function configureGuard(LoginService, $transitions, $state) {
    $transitions.onBefore({
      to: function(state) {
        return !angular.isDefined(state.ehRotaRaiz);
      }
    }, function(transition) {
      return LoginService.checarLogado().then(function(resp) {
        return resp !== null;
      });
    }, {
      priority: 1
    });
    $transitions.onBefore({
      to: 'login'
    }, function(transition) {
      return LoginService.checarLogado().then(function(resp) {
        if (resp !== null) {
          LoginService.deslogar();
        }
      });
    }, {
      priority: 1
    });
  }
})();
