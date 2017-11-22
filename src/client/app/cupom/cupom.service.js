(function () {
  'use strict';

  angular
    .module('app.cupom')
    .service('CupomService', CupomService);

  /* @ngInject */
  function CupomService($window, $filter) {
    var _self = this;
    _self.imprimir = imprimir;
    _self.geraHtml = geraHtml;
    _self.geraCabecalho = geraCabecalho;

    function imprimir (pedido = undefined) {
      var impressao = $window.open();
      impressao.document.write(geraHtml(pedido));
      impressao.print();
      impressao.close();
    }

    function geraHtml (empresa, pedido = undefined) {
      if (pedido === undefined) {
        var pedido = {
          numero: 12345,
          produtos: [{quantidade:2, descricao: 'parafuso', preco: 3.50}],
          total: 3.5,
          desconto: 0,
          tributo: 1,
          data: new Date()
        }
      }
      var stringHtml = '';
      stringHtml = stringHtml.concat('<html>');
      stringHtml = stringHtml.concat('<head>');
      stringHtml = stringHtml.concat('<title>Nota' + pedido.numero + '</title>');
      stringHtml = stringHtml.concat(geraEstilo());
      stringHtml = stringHtml.concat('</head>');
      stringHtml = stringHtml.concat('<body>');
      stringHtml = stringHtml.concat(geraCabecalho(empresa, pedido));
      stringHtml = stringHtml.concat(geraTopo());
      stringHtml = stringHtml.concat(listaProdutos(pedido.produtos));
      stringHtml = stringHtml.concat(geraResultados(pedido));
      stringHtml = stringHtml.concat('<span>PDV 03.01.00</span>');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('&emsp;');
      stringHtml = stringHtml.concat('<span>' + pedido.data.getYear() + '' +
        pedido.data.getDate() + ' ' + pedido.data.getFullYear() + ' ' + pedido.data.getTime() + '</span>');
      stringHtml = stringHtml.concat('</div>');
      stringHtml = stringHtml.concat('<hr>');
      stringHtml = stringHtml.concat('<div id="rodape">');
      stringHtml = stringHtml.concat('<span> VALOR APROXIMADO DOS TRIBUTOS CASO A VENDA SEJA EFETUADA ');
      stringHtml = stringHtml.concat('(CONFORME A LEI FEDERAL 12.741/2012) (FONTE: IBPT)' +
        $filter('currency')(pedido.tributo, '', 2) + '</span>');
      stringHtml = stringHtml.concat('<hr>');
      stringHtml = stringHtml.concat('<span>OBRIGADO PELA PREFERÊNCIA</span>');
      stringHtml = stringHtml.concat('<hr>');
      stringHtml = stringHtml.concat('<span>NUMERO TOTAL DE ITENS NO PEDIDO: ' + pedido.produtos.length + '</span>');
      stringHtml = stringHtml.concat('<hr>');
      stringHtml = stringHtml.concat('<span style="display:block;font-size:20px;">||||||||||||||||||' +
        '|||||||||||||||||||||||||||||||||</span>');
      stringHtml = stringHtml.concat('<br>');
      stringHtml = stringHtml.concat('<span style="display:block;font-size:20px;">||||||||||||||||||' +
        '|||||||||||||||||||||||||||||||||</span>');
      stringHtml = stringHtml.concat('</div>');
      stringHtml = stringHtml.concat('</body>');
      stringHtml = stringHtml.concat('</html>');
      return stringHtml;
    }

    function geraEstilo () {
      var arrayEstilo = [
        '<style>',
          'body{width:302px;font-family:arial;font-size:11px;font-weight: bold;}',
          '#primeiro{ text-align:center;}',
          '#segundo{}',
          '#data{text-align:left;float:left;}',
          '#data{text-align:center;}',
          '#numero{text-align:right;}',
          '#terceiro{text-align:left;}',
          '#terceiro #total{text-align:right;}',
          '#quarto{}',
          '#rodape{}',
          '.iten{}',
          '.info{}',
        '</style>'
      ];
      return arrayEstilo.join('');
    }

    function geraCabecalho (empresa, pedido = undefined) {
      var arrayCabecalho = [
        '<div id="primeiro">',
        '<span>'+ empresa.nomeFantasia + '</span>',
        '<br>',
        '<span>' + empresa.descricao + '</span>',
        '<br>',
        '<span>' + empresa.endereco + '</span>',
        '<br>',
        '<span>' + empresa.bairro + ' - ' + empresa.cidade + ' - ' + empresa.estado + 'FONE: ' +  empresa.telefone + '</span>',
        '<br>',
        '<hr>',
        '<div id="segundo">',
        '<div id="cupom">CUPOM NÃO FISCAL</div>',
        '<div id="data">' + $filter('date')(pedido ? pedido.data : new Date(), 'dd/MM/yyyy HH:mm') + '</div>',
        '<div id="numero">Pedido nº:' + (pedido ? pedido.numero : '123456') + '</div>',
        '</div>'
      ];
      return arrayCabecalho.join('');
    }

    function geraTopo () {
      var arrayTopo = [
        '<hr>',
        '<div id="terceiro">',
        '<div id="cabecalho">',
        '<div style="float:left;">',
        '<span>ITEM</span>',
        '&emsp;',
        '<span>DESCRIÇÃO</span>',
        '</div>',
        '<div id="total">',
        '<span>QTD</span>',
        '&emsp;',
        '<span>VL.UNIT</span>',
        '&emsp;',
        '<span>VL.ITEM</span>',
        '</div>',
        '</div>',
        '<br>'
      ];
      return arrayTopo.join('');
    }

    function listaProdutos(produtos) {
      var stringListaProdutos = '';
      angular.forEach(produtos, function (value, key) {
        stringListaProdutos = stringListaProdutos.concat('<div class="iten">');
        stringListaProdutos = stringListaProdutos.concat('<div style="float:left;">');
        stringListaProdutos = stringListaProdutos.concat('<span>' + (key + 1) + '</span>');
        stringListaProdutos = stringListaProdutos.concat('&emsp;');
        stringListaProdutos = stringListaProdutos.concat('<span class="descricao">' + value.descricao + '</span>');
        stringListaProdutos = stringListaProdutos.concat('</div>');
        stringListaProdutos = stringListaProdutos.concat('<div id="total">');
        stringListaProdutos = stringListaProdutos.concat('<span>' + value.quantidade + '</span>');
        stringListaProdutos = stringListaProdutos.concat('&emsp;');
        stringListaProdutos = stringListaProdutos.concat('<span>' + $filter('currency')(value.preco, '', 2) + '</span>');
        stringListaProdutos = stringListaProdutos.concat('&emsp;');
        stringListaProdutos = stringListaProdutos.concat('<span class="info">' + $filter('currency')(value.preco * value.quantidade, '', 2) + '</span>');
        stringListaProdutos = stringListaProdutos.concat('</div>');
        stringListaProdutos = stringListaProdutos.concat('</div>');
        stringListaProdutos = stringListaProdutos.concat('<br>');
      });
      return stringListaProdutos;
    }

    function geraResultados(pedido) {
      var arrayResultados = [
        '<div id="baixo" style="text-align:right;">',
        '<div style="float:left;">',
        '<span>SUBTOTAL</span>',
        '<br>',
        '<span>DESCONTO</span>',
        '<br>',
        '<span>TOTAL</span>',
        '</div>',
        '<span>' + $filter('currency')(pedido.total, '', 2) + '</span>',
        '<br>',
        '<span>' + $filter('currency')(pedido.desconto, '', 2) + '</span>',
        '<br>',
        '<span>' + $filter('currency')(pedido.total - pedido.desconto, '', 2) + '</span>',
        '</div>',
        '<br>'
      ];
      return arrayResultados.join('');
    }
  }
})();
