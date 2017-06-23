(function () {
  'use strict';

  angular
    .module('app.login')
    .service('LoginService', LoginService);

  /* @ngInject */
  function LoginService($firebaseAuth, $firebaseObject, $state, logger) {
    var _self = this;
    _self.logar = logar;
    _self.checarLogado = checarLogado;
    _self.deslogar = deslogar;

    function logar(usuario, senha, route) {
      return $firebaseAuth().$signInWithEmailAndPassword(usuario, senha)
        .then(function (result) {
          $state.go(route);
        }).catch(function (error) {
          trataErrosLogin(error);
        });
    }

    function checarLogado() {
      return $firebaseAuth().$waitForSignIn();
    }

    function deslogar() {
      $firebaseAuth().$signOut();
    }

    function trataErrosLogin(erro) {
      switch (erro.code) {
        case 'auth/user-not-found':
          return logger.error('Conta não Encontrada');
        case 'auth/invalid-email':
          return logger.warning('Email Inválido');
        case 'auth/invalid-password':
          return logger.warning('Senha Inválido');
        case 'auth/wrong-password':
          return logger.warning('Email e/ou Senha Incorreta');
      }
    }
  }
})();
