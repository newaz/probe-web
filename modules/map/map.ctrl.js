
'use strict';
(function () {
    var smsModule = angular.module('probeApp.map');
    smsModule.controller('MapCtrl', ['$scope','$http','uiGmapGoogleMapApi',function ($scope,$http,uiGmapGoogleMapApi) {

        $scope.map = {
            zoom: 4,
            bounds: {},
            center: {
                latitude: 0,
                longitude: 0
            }
        };
        $scope.randomMarkers = [];

        $scope.selectedMarker = {};

        $scope.options = {scrollwheel: true};



        var createMarker = function(device) {
            var ret = {
                id:device.id,
                latitude: device.latitude,
                longitude: device.longitude,
                title:  device.phone1,
                show: false
            };
            return ret;
        }


        uiGmapGoogleMapApi.then(function(maps) {

            var llBound = new maps.LatLngBounds();


            $http.get('/api/ProbeInstallations').success(function (data) {
                for(var i=0; i<data.length;i++){
                    var device = data[i];
                    if(device){
                        var marker = createMarker(device);

                        $scope.randomMarkers.push(marker);
                        var myLatlng = new google.maps.LatLng(marker.latitude,marker.longitude);
                        llBound.extend(myLatlng);

                    }
                }
                $scope.map.center = {
                    latitude: llBound.getCenter().lat(),
                    longitude: llBound.getCenter().lng()
                };


            });

        });


        $scope.markersEvents = {
            click: function (gMarker, eventName, model) {
                if(model.$id){
                    model = model.coords;//use scope portion then
                }
                $scope.selectedMarker = model;
                console.log(model);
            }
        };

        var markerToClose = null;
        $scope.onMarkerClicked = function (marker) {
            markerToClose = marker;
            marker.showWindow = true;
            $scope.$apply();
        };
        $scope.onInsideWindowClick = function () {
        };


    }]);
}());