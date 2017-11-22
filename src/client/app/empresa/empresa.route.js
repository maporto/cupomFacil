(function () {
  'use strict';

  angular
    .module('app.empresa')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [{
      state: 'empresa',
      config: {
        url: '/empresa',
        templateUrl: 'app/empresa/empresa.html',
        controller: 'EmpresaController',
        controllerAs: '$ctrl',
        title: 'Dados da Empresa',
      }
    }];
  }
})();
