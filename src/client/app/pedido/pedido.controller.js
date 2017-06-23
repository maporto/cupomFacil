(function () {
  'use strict';

  angular
    .module('app.pedido')
    .controller('PedidoController', PedidoController);

  /* @ngInject */
  function PedidoController($state, $firebaseObject) {
    var _self = this;
    _self.title = 'Pedido';
    _self.adicionarProduto = adicionarProduto;
    _self.novoPedido = novoPedido;
    _self.imprimir = imprimir;
    init();

    function init() {
      _self.nota = [];
      _self.nota.itens = [];
      adicionarProduto();
    }

    function adicionarProduto() {
      _self.nota.itens.push({
        quantidade: 1,
        descricao: '',
        preco: null
      });
    }

    function novoPedido() {

    }

    function carregaProdutos(descricao) {

    }

    function imprimir() {

    }

  }
})();
