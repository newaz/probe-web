(function () {

 var probeApp = angular
.module('probeApp',
     [
         'ngResource',
         'ui.router',
         'probeApp.client',
         'probeApp.sms'
     ]);
    probeApp.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/client');
    });
}());
