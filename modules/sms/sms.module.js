'use strict';
var smsModule = angular.module('probeApp.sms', ['ui.router']);
smsModule.config(function ($stateProvider) {
    $stateProvider
        .state('sms', {
            url: '/sms',
            templateUrl: 'modules/sms/sms.html',
            controller:'SMSCtrl'
        });
});