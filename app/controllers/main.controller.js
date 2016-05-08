angular.module("alpimaTest").controller("mainCtrl", ['$state', mainCtrl]);

function mainCtrl($state){
    $state.go("main.list");
}