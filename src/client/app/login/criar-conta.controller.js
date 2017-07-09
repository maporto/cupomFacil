(function () {
  'use strict';

  angular
    .module('app.login')
    .controller('CriarContaController', CriarContaController);

  /* @ngInject */
  function CriarContaController($state, $firebaseObject, $firebaseArray,
    logger, Auth, firebase, $firebaseAuth, LoginService) {
    var _self = this;
    _self.user = [];
    _self.title = 'Nova Conta';
    _self.criarConta = criarConta;

    function criarConta() {
      $firebaseAuth().$createUserWithEmailAndPassword(_self.user.usuario, _self.senha)
        .then(function (firebaseUser) {
          var empresasRef = firebase.database().ref('empresas/' + firebaseUser.uid).child('/info');
          $firebaseObject(empresasRef).$loaded().then(function (value) {
            value.nome = _self.user.empresa;
            value.$save();
          });
        }).catch(function (error) {
          logger.error(error);
        });
    }
  }
})();
