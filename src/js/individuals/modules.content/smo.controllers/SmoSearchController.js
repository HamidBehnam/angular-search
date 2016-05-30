/**
 * Created by hamidbehnam on 5/29/16.
 */

angular.module("smo.controllers")
    .controller("SmoSearchController", SmoSearchController);

function SmoSearchController() {
    var vm = this;
    vm.movies = [];
    vm.currentRequestHandle = null;
    vm.wrapYear = function (year) {
        return "(".concat(" ", year, " )");
    };
}
