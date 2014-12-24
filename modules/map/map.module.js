'use strict';
var mapModule = angular.module('probeApp.map', ['ui.router','ui.bootstrap']);


mapModule.provider('modalState', function($stateProvider) {
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



mapModule.config(function ($stateProvider,modalStateProvider) {
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'modules/map/map.html',
            controller:'MapCtrl'
        });


    modalStateProvider.state('map.smsModalMap', {
        url: '/smsModalMap/:clientId',
        templateUrl: 'modules/common/sendSmsModal.html',
        controller:'MapCtrl'
    });


    modalStateProvider.state('map.systemCallModalMap', {
        url: '/systemCallModalMap/:clientId',
        templateUrl: 'modules/common/systemCallModal.html',
        controller:'MapCtrl'
    });


    modalStateProvider.state('map.sendPingModalMap', {
        url: '/sendPingModalMap/:clientId',
        templateUrl: 'modules/common/sendPingModal.html',
        controller:'MapCtrl'
    });

});