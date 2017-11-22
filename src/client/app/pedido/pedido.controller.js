(function () {
  'use strict';

  angular
    .module('app.pedido')
    .controller('PedidoController', PedidoController);

  /* @ngInject */
  function PedidoController($state, $firebaseArray, $firebaseObject, firebase, $window, $filter, logger, $scope, $rootScope, CupomService) {
    var _self = this;
    _self.title = 'Pedido';
    _self.adicionarProduto = adicionarProduto;
    _self.novoPedido = novoPedido;
    _self.imprimir = imprimir;
    _self.carregaProdutos = carregaProdutos;
    _self.upperCase = upperCase;
    _self.addWatch = addWatch;
    _self.refProdutos = firebase.database().ref($rootScope.user.uid + '/produtos');
    _self.firebaseProdutos = $firebaseArray(_self.refProdutos);
    init();

    function init() {
      _self.alterar = false;
      _self.salvar = false;
      _self.findProduto = {};
      _self.nota = {};
      _self.nota.itens = [];
      _self.nota.numero = new Date().getUTCMilliseconds();
      _self.nota.subtotal = 0;
      _self.nota.total = 0;
      _self.nota.desconto = 0;
      adicionarProduto();
    }

    function adicionarProduto() {
      var produtoAtual = _self.nota.itens[_self.nota.itens.length - 1];
      if (_self.salvar) {
        salvaProduto(produtoAtual);
      } else if (_self.alterar) {
        alteraProduto(_self.findProduto.$id, _self.nota.itens[_self.nota.itens.length - 1]);
      }
      _self.nota.itens.push({
        quantidade: 1,
        preco:0
      });
      _self.alterar = false;
      _self.salvar = true;
      _self.addWatch(_self.nota.itens[_self.nota.itens.length - 1]);
    }

    function addWatch(item) {
      $scope.$watch(angular.bind(_self, function () {
        return item.quantidade;
      }), function (value) {
        verificaTotal();
      });
      $scope.$watch(angular.bind(_self, function () {
        return item.preco;
      }), function (value) {
        verificaTotal();
      });
    }

    function verificaTotal() {
      _self.nota.subtotal = 0;
      angular.forEach(_self.nota.itens, function (value) {
        _self.nota.subtotal = _self.nota.subtotal + value.quantidade * value.preco;
      });
    }

    function novoPedido() {
      init();
    }

    function carregaProdutos(descricao) {
      var refProdutos = _self.refProdutos.orderByChild('descricao').startAt(descricao);
      return $firebaseArray(refProdutos).$loaded();
    }

    function getItens() {
      _self.nota.total = 0;
      var itens = [];
      itens.totalItens = 0;
      angular.forEach(_self.nota.itens, function (value) {
        if (value.descricao !== '' && value.quantidade !== '' && value.preco !== '') {
          value.total = value.preco * value.quantidade;
          _self.nota.total = _self.nota.total + value.total;
          itens.push(value);
          itens.totalItens = itens.totalItens + value.quantidade;
        }
      });
      _self.nota.tributo = _self.nota.total * 0.30;
      return itens;
    }

    function isEmpty(obj) {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return false;
        }
      }
      return true;
    }

    function salvaProduto(produto) {
      var produtoFormatado = {
        descricao: produto.descricao,
        preco: produto.preco
      };
      _self.firebaseProdutos.$add(produtoFormatado);
      logger.success('Produto Adicionado');
    }

    function alteraProduto(id, produto) {
      var produtoAtual = $firebaseObject(_self.refProdutos.child(id));
      produtoAtual.preco = produto.preco;
      produtoAtual.descricao = produto.descricao;
      produtoAtual.$save();
      logger.success('Produto Alterado');
    }

    function imprimir() {
      CupomService.imprimir();
    }

    function upperCase(texto) {
      return texto.toUpperCase();
    }

  }
})();
