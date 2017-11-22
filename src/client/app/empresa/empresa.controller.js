(function () {
  'use strict';

  angular
    .module('app.empresa')
    .controller('EmpresaController', EmpresaController);

  /* @ngInject */
  function EmpresaController($scope, CupomService, $firebaseObject, firebase, $rootScope) {
    var _self = this;
    init();

    function init() {
      _self.refEmpresa = firebase.database().ref($rootScope.user.uid + '/empresa');
      _self.empresa = $firebaseObject(_self.refEmpresa);
    }

    $scope.$watch(angular.bind(this, function () {
      return this.empresa;
    }), function (empresa) {
      _self.nota = CupomService.geraHtml(empresa);
    }, true);
  }
})();
