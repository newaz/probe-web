'use strict';

(function() {

    var probeApp = angular.module('probeApp');

    probeApp.factory('probeRemoteService',['$http', function($http) {
        return {

            getClients: function (){
               return $http.get('/api/ProbeInstallations');
            },
            ping: function(id){
               return $http.post('/api/PingPongs/ping/' + encodeURIComponent(id),null);
            },
            deleteClient: function (id){
                  return  $http.delete('/api/ProbeInstallations/' + encodeURIComponent(id));
            },
            sendUssd: function(clientId,ussdCode,retryCount){

                var json =
                {   "clientId":  clientId,
                    "ussdCode": ussdCode,
                    "retryCount":retryCount
                };
                console.log("json data to send:"+JSON.stringify(json));
                return $http.post('/api/UssdTestConfigurations',json);
            },
            sendSms: function(clientId,destination,content,retryCount){
                var json =
                {   "clientId": clientId ,
                    "destination": destination,
                    "content": content,
                    "retryCount":retryCount
                };
                console.log("json data to send:"+JSON.stringify(json));
                return $http.post('/api/sms/createConfigurationAndSendSms',json);
            }

        };

    }]);

}());
