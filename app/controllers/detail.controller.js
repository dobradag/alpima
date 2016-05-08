angular.module("alpimaTest").controller("detailCtrl", ["$rootScope", "$http", "$state", "$stateParams", "config", "toastFactory", detailCtrl]);

function detailCtrl($rootScope, $http, $state, $stateParams, config, toastFactory){

    var detail = this;

    detail.gotOhlcChart = false;
    detail.gotVolumeChart = false;
    detail.gotHeader = false;
    detail.ticker = {};

    var baseUrl = config.values.apiBaseUrl;

    $rootScope.$on("config.loaded", function (event, values) {
        baseUrl = config.values.apiBaseUrl;
        getHeader();
        getChartData();
    });

    function getHeader(){
        if(baseUrl){
            $http.get(baseUrl + "tickers/" + $stateParams.code).then(function (result) {
                detail.ticker = result.data ? result.data[0] : {};
                detail.gotHeader = true;
            }, function (err) {
                toastFactory.displayToastMessage(err.statusText + ": " + err.data.message);
            });
        }
    }

    function getChartData(){
        if(baseUrl){
            $http.get(baseUrl + $stateParams.code + "/chartData").then(function (result) {
                detail.ohlcChartData = [ new ChartData(result.data.ohlc)];
                detail.ohlcChartOptions = new ChartOptions("ohlcBarChart", "close", "Price");
                detail.gotOhlcChart = true;

                detail.volumeChartData = [ new ChartData(result.data.volume)];
                detail.volumeChartOptions = new ChartOptions("historicalBarChart", "volume", "Volume (k)");
                detail.gotVolumeChart = true;
            }, function (err) {
                toastFactory.displayToastMessage(err.statusText + ": " + err.data.message);
            });
        }
    }

    if(baseUrl){
        getHeader();
        getChartData();
    }

}
