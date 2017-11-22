(function () {
  'use strict';

  angular
    .module('app.home')
    .controller('HomeController', HomeController);

  /* @ngInject */
  function HomeController($state) {
    var _self = this;
    _self.novoPedido = novoPedido;
    _self.dadosEmpresa = dadosEmpresa;

    init();

    function novoPedido () {
      $state.go('pedido');
    }

    function dadosEmpresa () {
      $state.go('empresa');
    }

    function init() {
    }
  }
})();
