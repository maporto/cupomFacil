(function () {
  'use strict';

  angular
    .module('app.pedido')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'pedido',
      config: {
        url: '/pedido',
        templateUrl: 'app/pedido/pedido.html',
        controller: 'PedidoController',
        controllerAs: 'pedido',
        title: 'Pedido',
      }
    }];
  }
})();
