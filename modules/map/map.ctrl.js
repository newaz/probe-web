
'use strict';
(function () {
    var smsModule = angular.module('probeApp.map');
    smsModule.controller('MapCtrl', ['$scope','uiGmapGoogleMapApi',function ($scope,uiGmapGoogleMapApi) {

        $scope.map = {
              zoom: 8
        };


        uiGmapGoogleMapApi.then(function(maps) {

            $scope.randomMarkers = [

                {
                    id:1,
                    latitude:55.7039493,
                    longitude:13.17098122
                },
                {
                    id:2,
                    latitude:56,
                    longitude:13
                }

            ];


            $scope.map.center = {
                latitude: 55.7039,
                longitude: 13.1709
            };
        });

    }]);
}());