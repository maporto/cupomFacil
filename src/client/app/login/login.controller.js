(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('LoginController', LoginController);

  /* @ngInject */
  function LoginController($state, LoginService, ) {
    var _self = this;
    _self.user = [];
    _self.title = 'Login';
    _self.logar = logar;

    function logar(usuario) {
      LoginService.logar(usuario.email, usuario.senha, 'pedido');
    }
  }
})();
