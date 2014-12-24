
'use strict';
(function () {
    var mapModule = angular.module('probeApp.map');
    mapModule.controller('MapCtrl', ['$scope','$http','uiGmapGoogleMapApi','$state','$stateParams','probeRemoteService'
        ,function ($scope,$http,uiGmapGoogleMapApi,$state,$stateParams,probeRemoteService) {


            $scope.$state = $state;
            $scope.smsTestConfig = {};
            $scope.ussdTestConfig = {};
            $scope.smsTestConfig.clientId = $stateParams.clientId;
            $scope.ussdTestConfig.clientId = $stateParams.clientId;


            $scope.map = {
                zoom: 3,
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


                var promise = probeRemoteService.getClients();
                promise.then(
                    function (payload) {
                        var data = payload.data;
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
                    },
                    function (errorPayload) {
                        // deferred.reject(errorPayload);
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



            $scope.notifyClient = function(id) {

                console.log("called notify:"+id);
                var promise = probeRemoteService.ping(id);
                promise.then(
                    function (payload) {
                        $scope.status = 'Notification sent: ' + payload.data;

                    },
                    function (errorPayload) {
                        $scope.status = 'Error: '+errorPayload.data;
                    });

            };


            $scope.delete = function (index, id) {


                var promise = probeRemoteService.deleteClient(id);
                promise.then(
                    function (payload) {
                        $scope.devices.splice(index, 1);
                        $scope.status = 'Record deleted: ' + id;

                    },
                    function (errorPayload) {
                        $scope.status = 'Error: '+errorPayload.data;
                    });

            };

            $scope.getAction = function (status) {
                return 'Active' === status ? 'Deactivate' : 'Activate';
            };


            $scope.openSendSmsTemplate = function () {
                $state.go('modal');
            };




            $scope.sendUssd = function () {
                console.log('here'+$stateParams.clientId);



                var promise = probeRemoteService.sendUssd($scope.ussdTestConfig.clientId,
                    $scope.ussdTestConfig.ussdCode,$scope.ussdTestConfig.retryCount);


                promise.then(
                    function (payload) {
                        $state.go('^');

                    },
                    function (errorPayload) {
                        $state.go('^');
                    });

            };




            $scope.sendSms = function () {
                console.log('here'+$stateParams.clientId);


                var promise = probeRemoteService.sendSms($scope.ussdTestConfig.clientId,
                    $scope.smsTestConfig.destination,$scope.smsTestConfig.content,$scope.smsTestConfig.retryCount);


                promise.then(
                    function (payload) {
                        $state.go('^');

                    },
                    function (errorPayload) {
                        $state.go('^');
                    });

            };


        }]);



    mapModule.controller('TestCtrl', ['$scope','$http','uiGmapGoogleMapApi','$state','$stateParams','probeRemoteService'
        ,function ($scope,$http,uiGmapGoogleMapApi,$state,$stateParams,probeRemoteService) {
                console.log("client:"+JSON.stringify($stateParams));
        }]);
}());