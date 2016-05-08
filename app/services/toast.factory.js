'use strict';

angular.module('alpimaTest')
    .factory('toastFactory', ['$mdToast', toastFactory]);

function toastFactory($mdToast) {

    var toastFactory = {
        displayToastMessage: showToast
    };

    return toastFactory;

    function showToast(message) {
        var toast = $mdToast.simple()
            .content(message)
            .action('OK')
            .highlightAction(false)
            .hideDelay(30000)
            .position("bottom left");
        $mdToast.show(toast).then(function (response) {
            if (response == 'ok') {

            }
        });

    }
}
