(function () {
  'use strict';

  angular
    .module('app.pedido')
    .controller('PedidoController', PedidoController);

  /* @ngInject */
  function PedidoController($state, $firebaseArray, $firebaseObject, firebase, $window, $filter, logger) {
    var _self = this;
    _self.title = 'Pedido';
    _self.adicionarProduto = adicionarProduto;
    _self.novoPedido = novoPedido;
    _self.imprimir = imprimir;
    _self.carregaProdutos = carregaProdutos;
    _self.upperCase = upperCase;
    _self.refProdutos = firebase.database().ref('produtos');
    _self.firebaseProdutos = $firebaseArray(_self.refProdutos);
    init();

    function init() {
      _self.alterar = false;
      _self.salvar = false;
      _self.nota = [];
      _self.nota.itens = [];
      _self.nota.numero = new Date().getUTCMilliseconds();
      _self.nota.total = 0;
      adicionarProduto();
    } 

    function adicionarProduto() {
      var produtoAtual = _self.nota.itens[_self.nota.itens.length - 1];
      if (_self.salvar) {
        salvaProduto(produtoAtual); 
      } else if (_self.alterar) {
        alteraProduto(produtoAtual);
      }
      _self.nota.itens.push({
        quantidade: 1,
        descricao: '',
        preco: null
      });
      _self.alterar = false;
      _self.salvar = true;
    }

    function novoPedido() {
      init();
    }

    function carregaProdutos(descricao) {
      var refProdutos = _self.refProdutos.orderByChild('descricao').startAt(descricao);
      return $firebaseArray(refProdutos).$loaded();
    }

    function getItens() {
      var itens = [];
      angular.forEach(_self.nota.itens, function (value) {
        if (value.descricao !== '' && value.quantidade !== '' && value.preco !== '') {
          value.total = value.preco * value.quantidade;
          _self.nota.total = _self.nota.total + value.total;
          itens.push(value);
        }
      });
      return itens;
    }

    function isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
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

    function alteraProduto(produto) {
      var produtoAtual = $firebaseArray(firebase.database().ref().child('produtos').orderByChild('descricao').equalTo(produto.descricao).limitToFirst(1)).$loaded().then(function (value){
        if(!isEmpty(value)){
          value[0].preco = produto.preco;
        }
        value.$save(0);
      });
      logger.success('Produto Alterado');
    }

    function imprimir() {
      var dataAtual = new Date();
      var impressao = $window.open();
      impressao.document.write('<html>');
      impressao.document.write('<head>');
      impressao.document.write('<title>Nota' + _self.nota.numero + '</title>');
      impressao.document.write('<style>');
      impressao.document.write('body{width:302px;font-family:courier;font-size:10px;font-weight: bold;}');
      impressao.document.write('#primeiro{ text-align:center;}');
      impressao.document.write('#segundo{}');
      impressao.document.write('#data{text-align:left;float:left;}');
      impressao.document.write('#numero{text-align:right;}');
      impressao.document.write('#terceiro{}');
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
      impressao.document.write('<span>São Paulo - Santana</span>');
      impressao.document.write('</div>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="segundo">');
      impressao.document.write('<div id="data">' + $filter('date')(dataAtual, 'dd/MM/yyyy HH:mm') + '</div>');
      impressao.document.write('<div id="numero">nº ' + _self.nota.numero + '</div>');
      impressao.document.write('</div>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="terceiro">');
      impressao.document.write('<div id="cabecalho">');
      impressao.document.write('<span>ITEM</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>QTD</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>DESCRIÇÃO</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>VL.UNIT</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('<span>VL.ITEM</span>');
      impressao.document.write('&emsp;');
      impressao.document.write('</div>');
      impressao.document.write('<br>');
      angular.forEach(getItens(), function (value, key) {
        impressao.document.write('<div class="iten">');
        impressao.document.write('<span>' + (key + 1) + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span>' + value.quantidade + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span class="descricao">' + value.descricao + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span>' + $filter('currency')(value.preco, 'R$', 2) + '</span>');
        impressao.document.write('&emsp;');
        impressao.document.write('<span class="info">' + $filter('currency')(value.total, 'R$', 2) + '</span>');
        impressao.document.write('</div>');
        impressao.document.write('<br>');
      });
      impressao.document.write('<span>TOTAL ' + $filter('currency')(_self.nota.total, 'R$', 2) + '</span>');
      impressao.document.write('<br>');
      impressao.document.write('</div>');
      impressao.document.write('<hr>');
      impressao.document.write('<div id="rodape">');
      impressao.document.write('<span>OBRIGADO PELA PREFERÊNCIA</span>');
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
