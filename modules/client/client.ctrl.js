
'use strict';
(function () {
    var clientModule = angular.module('probeApp.client');
    clientModule.controller('ClientCtrl', ['$scope','$http',function ($scope, $http) {

        $http.get('/api/ProbeInstallations').success(function (data) {
            $scope.devices = data;
            $scope.orderProp = 'appId';
        });

        $scope.notify = function (id, msg) {
            $http.post('/notify/' + encodeURIComponent(id), {msg: msg}).success(function (data, status, headers) {
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

    }]);




}());