(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .controller('ToastrController', ToastrController);

  /* @ngInject */
  function ToastrController(locals) {
    var _self = this;
    _self.mensagem = locals.mensagem;
    _self.color = locals.color;
  }
})();
