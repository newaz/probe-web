
'use strict';
(function () {
    var clientModule = angular.module('probeApp.client');
    clientModule.controller('ClientCtrl', ['$scope','$http','$state','$stateParams','probeRemoteService',
        function ($scope, $http,$state,$stateParams,probeRemoteService) {

        $scope.$state = $state;
        $scope.smsTestConfig = {};
        $scope.ussdTestConfig = {};
        $scope.smsTestConfig.clientId = $stateParams.clientId;
        $scope.ussdTestConfig.clientId = $stateParams.clientId;


        $scope.init = function () {
            var promise = probeRemoteService.getClients();
            promise.then(
            function (payload) {
                console.log("successs !!!!");
                $scope.devices = payload.data;
                $scope.orderProp = 'appId';
            },
            function (errorPayload) {
               // deferred.reject(errorPayload);
            });
        };

    /*    $http.get('/api/ProbeInstallations').success(function (data) {
            $scope.devices = data;
            $scope.orderProp = 'appId';
        });*/

        $scope.notify = function (id) {

            var promise = probeRemoteService.ping(id);
            promise.then(
                function (payload) {
                    $scope.status = 'Notification sent: ' + payload.data;

                },
                function (errorPayload) {
                    $scope.status = 'Error: '+errorPayload.data;
             });

/*
            $http.post('/api/PingPongs/ping/' + encodeURIComponent(id), {msg: msg}).success(function (data, status, headers) {
                $scope.status = 'Notification sent: ' + data + ' status: ' + status;
            });*/
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




           /* $http.delete('/api/ProbeInstallations/' + encodeURIComponent(id)).success(function (data, status, headers) {
                $scope.devices.splice(index, 1);
                $scope.status = 'Record deleted: ' + id + ' status: ' + status;
            });*/
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


/*
            var json =
            {   "clientId":  $scope.ussdTestConfig.clientId,
                "ussdCode": $scope.ussdTestConfig.ussdCode,
                "retryCount":$scope.ussdTestConfig.retryCount
            };

                console.log("json data to send:"+JSON.stringify(json));

            $http.post('/api/UssdTestConfigurations',json).success(function (data, status, headers) {
                $scope.status = 'USSD request sent: ' + data + ' status: ' + status;
                $state.go('^');

            });*/
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

/*

            var json =
                {   "clientId": $scope.smsTestConfig.clientId ,
                    "destination": $scope.smsTestConfig.destination,
                    "content": $scope.smsTestConfig.content,
                    "retryCount":$scope.smsTestConfig.retryCount
                };


            console.log("json data to send:"+JSON.stringify(json));

            $http.post('/api/map/createConfigurationAndSendSms',json).success(function (data, status, headers) {
                $scope.status = 'Notification sent: ' + data + ' status: ' + status;
                $state.go('^');

            });
*/
        };


    }]);




}());