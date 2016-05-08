angular.module("alpimaTest").controller("listCtrl", ["$rootScope", "$http", "$state", "config", "toastFactory", listCtrl]);

function listCtrl($rootScope, $http, $state, config, toastFactory) {

    var list = this;

    list.tickers = [];
    list.showDetails = goDetails;

    var baseUrl = config.values.apiBaseUrl;
    var tickers = config.values.requestTickers ? config.values.requestTickers.toString() : "";

    $rootScope.$on('config.loaded', function (event, values) {
        baseUrl = config.values.apiBaseUrl;
        tickers = config.values.requestTickers.toString();
        getTickers();
    });

    function getTickers() {

        if (baseUrl) {
            $http.get(baseUrl + "tickers/" + tickers).then(function (result) {
                list.tickers = result.data;
            }, function (err) {
                toastFactory.displayToastMessage(err.statusText + ": " + err.data.message);
            });
        }
    }

    function goDetails(code) {
        $state.go("main.detail", {code: code});
    }

    if(baseUrl){
        getTickers();
    }

}
