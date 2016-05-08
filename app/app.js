var app = angular.module("alpimaTest", ["ui.router", "ngMaterial", 'nvd3']);

app.config(function ($stateProvider, $urlRouterProvider) {
    //
    $urlRouterProvider.otherwise("select");

    $stateProvider
        .state("main", {
            url: "/",
            templateProvider: function($templateCache){
                return $templateCache.get("app/views/main.html");
            },
            controller: "mainCtrl",
            controllerAs: "main"
        })
        .state("main.list", {
            url: "select",
            templateProvider: function($templateCache){
                return $templateCache.get("app/views/list.html");
            },
            controller: "listCtrl",
            controllerAs: "list"
        })
        .state("main.detail", {
            url: ":code/historical",
            templateProvider: function($templateCache){
                return $templateCache.get("app/views/detail.html");
            },
            controller: "detailCtrl",
            controllerAs: "detail"

        })
});


app.config(function($mdDateLocaleProvider) {
    $mdDateLocaleProvider.formatDate = function(date) {
        return date ? moment(date).format('DD/MM/YYYY') : ''
    };

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, 'DD/MM/YYYY', true);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };
});
