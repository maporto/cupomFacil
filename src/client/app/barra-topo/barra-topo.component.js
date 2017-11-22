(function () {
  'use strict';

  angular
    .module('app.barra-topo')
    .component('barraTopo', {
      controller: BarraTopo,
      controllerAs: 'barraTopo',
      templateUrl: 'app/barra-topo/barra-topo.html'
    });

  /* @ngInject */
  function BarraTopo($state, $window, $document) {
    var _self = this;
    _self.back = back;
    _self.state = $state;
    init();

    function back () {
      $window.history.back();
    }

    function init() { }
  }
})();
