/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.controllers")
    .controller("MainController", ["$scope", MainController ]);

function MainController($scope) {
    var vm = this;

    vm.testField = "this is the test field!";
}
