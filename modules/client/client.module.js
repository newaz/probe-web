'use strict';
var clientModule = angular.module('probeApp.client', ['ui.router','ui.bootstrap']);

clientModule.provider('modalState', function($stateProvider) {
    var provider = this;
    this.$get = function() {
        return provider;
    }
    this.state = function(stateName, options) {
        var modalInstance;
        $stateProvider.state(stateName, {
            url: options.url,
            onEnter: function($modal, $state) {
                modalInstance = $modal.open(options);
                modalInstance.result['finally'](function() {
                    modalInstance = null;
                    if ($state.$current.name === stateName) {
                        $state.go('^');
                    }
                });
            },
            onExit: function() {
                if (modalInstance) {
                    modalInstance.close();
                }
            }
        });
    };
});



clientModule.config(function ($stateProvider,modalStateProvider) {
    $stateProvider
        .state('client', {
            url: '/client',
            templateUrl: 'modules/client/client.html',
            controller:'ClientCtrl'
        });


    modalStateProvider.state('client.smsModal', {
        url: '/smsModal/:clientId',
        templateUrl: 'modules/client/sendSmsModal.html',
        controller:'ClientCtrl'
    });


    modalStateProvider.state('client.systemCallModal', {
        url: '/systemCallModal/:clientId',
        templateUrl: 'modules/client/systemCallModal.html',
        controller:'ClientCtrl'
    });

});