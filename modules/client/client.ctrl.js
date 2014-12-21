
'use strict';
(function () {
    var clientModule = angular.module('probeApp.client');
    clientModule.controller('ClientCtrl', ['$scope','$http','$state','$stateParams',function ($scope, $http,$state,$stateParams) {

        $scope.$state = $state;
        $scope.smsTestConfig = {};
        $scope.ussdTestConfig = {};
        $scope.smsTestConfig.clientId = $stateParams.clientId;
        $scope.ussdTestConfig.clientId = $stateParams.clientId;

        $http.get('/api/ProbeInstallations').success(function (data) {
            $scope.devices = data;
            $scope.orderProp = 'appId';
        });

        $scope.notify = function (id, msg) {
            $http.post('/api/PingPongs/ping/' + encodeURIComponent(id), {msg: msg}).success(function (data, status, headers) {
                $scope.status = 'Notification sent: ' + data + ' status: ' + status;
            });
        };


        $scope.delete = function (index, id) {
            $http.delete('/api/ProbeInstallations/' + encodeURIComponent(id)).success(function (data, status, headers) {
                $scope.devices.splice(index, 1);
                $scope.status = 'Record deleted: ' + id + ' status: ' + status;
            });
        };

        $scope.getAction = function (status) {
            return 'Active' === status ? 'Deactivate' : 'Activate';
        };


        $scope.openSendSmsTemplate = function () {
            $scope.smsTestConfig.clientId=
            $state.go('modal')
        };




        $scope.sendUssd = function () {
            console.log('here'+$stateParams.clientId);

            var json =
            {   "clientId":  $scope.ussdTestConfig.clientId,
                "ussdCode": $scope.ussdTestConfig.ussdCode,
                "retryCount":$scope.ussdTestConfig.retryCount
            };


            console.log("json data to send:"+JSON.stringify(json));

            $http.post('/api/UssdTestConfigurations',json).success(function (data, status, headers) {
                $scope.status = 'USSD request sent: ' + data + ' status: ' + status;
                $state.go('^');

            });
        };




        $scope.sendSms = function () {
            console.log('here'+$stateParams.clientId);

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
        };


    }]);




}());