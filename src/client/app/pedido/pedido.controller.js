(function () {
  'use strict';

  angular
    .module('app.pedido')
    .controller('PedidoController', PedidoController);

  /* @ngInject */
  function PedidoController($state, $firebaseArray, $firebaseObject, firebase, $window, $filter, logger, $scope) {
    var _self = this;
    _self.title = 'Pedido';
    _self.adicionarProduto = adicionarProduto;
    _self.novoPedido = novoPedido;
    _self.imprimir = imprimir;
    _self.carregaProdutos = carregaProdutos;
    _self.upperCase = upperCase;
    _self.addWatch = addWatch;
    _self.refProdutos = firebase.database().ref('produtos');
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
      angular.forEach(_self.nota.itens, function (value) {
        if (value.descricao !== '' && value.quantidade !== '' && value.preco !== '') {
          value.total = value.preco * value.quantidade;
          value.totalItens = value.totalItens + value.quantidade;
          _self.nota.total = _self.nota.total + value.total;
          itens.push(value);
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
      var dataAtual = new Date();
      var impressao = $window.open();
      impressao.document.write('<html>');
      impressao.document.write('<head>');
      impressao.document.write('<title>Nota' + _self.nota.numero + '</title>');
      impressao.document.write('<style>');
      impressao.document.write('body{width:302px;font-family:arial;font-size:11px;font-weight: bold;}');
      impressao.document.write('#primeiro{ text-align:center;}');
      impressao.document.write('#segundo{}');
      impressao.document.write('#data{text-align:left;float:left;}');
      impressao.document.write('#data{text-align:center;}');
      impressao.document.write('#numero{text-align:right;}');
      impressao.document.write('#terceiro{text-align:left;}');
      impressao.document.write('#terceiro #total{text-align:right;}');
      impressao.document.write('#quarto{}');
      impressao.document.write('#rodape{}');
      impressao.document.write('.iten{}');
      impressao.document.write('.info{}');
      impressao.document.write('</style>');
      impressao.document.write('</head>');
      impressao.document.write('<body>');
      impressao.document.write('<div id="primeiro">');
      impressao.document.write('<span>Nova Franquia</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span>COMÉRCIO DE MATERIAIS PARA CONSTRUÇÃO</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span>RUA VOLUNTARIS DA PATRIA 2041 LOJA 12</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span>SANTANA -SÃO PAULO - S.P.FONE: 2975-2355</span>');
      impressao.document.write('<br>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="segundo">');
      impressao.document.write('<div id="cupom">CUPOM NÃO FISCAL</div>');
      impressao.document.write('<div id="data">' + $filter('date')(dataAtual, 'dd/MM/yyyy HH:mm') + '</div>');
      impressao.document.write('<div id="numero">Pedido nº:' + _self.nota.numero + '</div>');
      impressao.document.write('</div>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="terceiro">');
      impressao.document.write('<div id="cabecalho">');
      impressao.document.write('<div style="float:left;">');
      impressao.document.write('<span>ITEM</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>DESCRIÇÃO</span>');
      impressao.document.write('</div>');
      impressao.document.write('<div id="total">');
      impressao.document.write('<span>QTD</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>VL.UNIT</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>VL.ITEM</span>');
      impressao.document.write('</div>');
      impressao.document.write('</div>');
      impressao.document.write('<br>');
      angular.forEach(getItens(), function (value, key) {
        impressao.document.write('<div class="iten">');
        impressao.document.write('<div style="float:left;">');
        impressao.document.write('<span>' + (key + 1) + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span class="descricao">' + value.descricao + '</span>');
        impressao.document.write('</div>');
        impressao.document.write('<div id="total">');
        impressao.document.write('<span>' + value.quantidade + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span>' + $filter('currency')(value.preco, '', 2) + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span class="info">' + $filter('currency')(value.total, '', 2) + '</span>');
        impressao.document.write('</div>');
        impressao.document.write('</div>');
        impressao.document.write('<br>');
      });
      impressao.document.write('<div id="total">');
      impressao.document.write('<span>SUBTOTAL ' + $filter('currency')(_self.nota.total, '', 2) + '</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span>DESCONTO ' + $filter('currency')(_self.nota.desconto, '', 2) + '</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span>TOTAL ' +
        $filter('currency')(_self.nota.total - _self.nota.desconto, '', 2) + '</span>');
      impressao.document.write('</div>');
      impressao.document.write('<br>');
      impressao.document.write('<span>PDV 03.01.00</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>' + dataAtual.getYear() + '' +
        dataAtual.getDate() + ' ' + dataAtual.getFullYear() + ' ' + dataAtual.getTime() + '</span>');
      impressao.document.write('</div>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="rodape">');
      impressao.document.write('<span> VALOR APROXIMADO DOS TRIBUTOS CASO A VENDA SEJA EFETUADA ');
      impressao.document.write('(CONFORME A LEI FEDERAL 12.741/2012) (FONTE: IBPT)' +
        $filter('currency')(_self.nota.tributo, '', 2) + '</span>');
      impressao.document.write('<hr>');
      impressao.document.write('<span>OBRIGADO PELA PREFERÊNCIA</span>');
      impressao.document.write('<hr>');
      impressao.document.write('<span>NUMERO TOTAL DE ITENS NO PEDIDO: ' + getItens().totalItens + '</span>');
      impressao.document.write('<hr>');
      impressao.document.write('<span style="display:block;font-size:20px;">||||||||||||||||||' +
        '|||||||||||||||||||||||||||||||||</span>');
      impressao.document.write('<br>');
      impressao.document.write('<span style="display:block;font-size:20px;">||||||||||||||||||' +
        '|||||||||||||||||||||||||||||||||</span>');
      impressao.document.write('</div>');
      impressao.document.write('</body>');
      impressao.document.write('</html>');
      impressao.print();
      impressao.close();
    }

    function upperCase(texto) {
      return texto.toUpperCase();
    }

  }
})();
