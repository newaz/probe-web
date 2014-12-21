'use strict';
var smsModule = angular.module('probeApp.map', ['ui.router']);
smsModule.config(function ($stateProvider) {
    $stateProvider
        .state('map', {
            url: '/map',
            templateUrl: 'modules/map/map.html',
            controller:'MapCtrl'
        });
});