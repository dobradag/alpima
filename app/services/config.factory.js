
"use strict";

angular.module("alpimaTest")
    .factory("config", ["$http", "$rootScope", configFactory]);

function configFactory($http, $rootScope){

    var configFactory = {
        values: {}
    };

    init();

    function init(){
        loadConfig(function(result){
            result = JSON.parse(result);
            configFactory.values = result;
            $rootScope.$broadcast("config.loaded", configFactory);
        });
    }

    return configFactory;

    function loadConfig(callback) {

        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open("GET", "config.json", true);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }
}
