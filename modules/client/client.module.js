'use strict';
var clientModule = angular.module('probeApp.client', ['ui.router']);
clientModule.config(function ($stateProvider) {
    $stateProvider
        .state('client', {
            url: '/client',
            templateUrl: 'modules/client/client.html',
            controller:'ClientCtrl'
        });
});