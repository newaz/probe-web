(function () {

 var probeApp = angular
.module('probeApp',
     [
         'ngResource',
         'ui.router',
         'uiGmapgoogle-maps',
         'probeApp.sidebar',
         'probeApp.client',
         'probeApp.map'
     ]);

    probeApp.config(['$urlRouterProvider','uiGmapGoogleMapApiProvider',
        function ($urlRouterProvider,uiGmapGoogleMapApiProvider) {

        $urlRouterProvider.otherwise('/client');

      uiGmapGoogleMapApiProvider.configure({
           // key: 'AIzaSyCq4e9rutvfGzd2kZB6BxzU2KXkkZiEBYU',
            v: '3.18',
            libraries: 'weather,geometry,visualization'
        });

    }]);



}());
