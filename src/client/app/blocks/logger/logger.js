
(function() {
  'use strict';

  angular
    .module('blocks.logger')
    .factory('logger', logger);

  logger.$inject = ['$log', '$mdToast'];

  /* @ngInject */
  function logger($log, $mdToast) {
    var service = {
      error: error,
      info: info,
      success: success,
      warning: warning,

      // straight to console; bypass toastr
      log: $log.log
    };

    return service;
    /////////////////////

    function error(message, data) {
      $mdToast.show({
        hideDelay : 3000,
        position : 'top right',
        controller : 'ToastrController',
        controllerAs: 'toastr',
        templateUrl : 'app/blocks/logger/toast.html',
        locals : {
          mensagem : message,
          color : '#F8333C'
        }
      });
      $log.error('Error: ' + message, data);
    }

    function info(message, data) {
      $mdToast.show({
        hideDelay : 3000,
        position : 'top right',
        controller : 'ToastrController',
        controllerAs: 'toastr',
        templateUrl : 'app/blocks/logger/toast.html',
        locals : {
          mensagem : message,
          color : '#DBD5B5'
        }
      });
      $log.info('Info: ' + message, data);
    }

    function success(message, data) {
      $mdToast.show({
        hideDelay : 3000,
        position : 'top right',
        controller : 'ToastrController',
        controllerAs: 'toastr',
        templateUrl : 'app/blocks/logger/toast.html',
        locals : {
          mensagem : message,
          color : '#44AF69'
        }
      });
      $log.info('Success: ' + message, data);
    }

    function warning(message, data) {
      $mdToast.show({
        hideDelay : 3000,
        position : 'top right',
        controller : 'ToastrController',
        controllerAs: 'toastr',
        templateUrl : 'app/blocks/logger/toast.html',
        locals : {
          mensagem : message,
          color : '#FCAB10'
        }
      });
      $log.warn('Warning: ' + message, data);
    }
  }
} ());
