/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.controllers", []);

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.directives", []);

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo", ["smo.controllers", "smo.directives", "smo.services"]);

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.services", []);

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.controllers")
    .controller("MainController", ["$scope", MainController ]);

function MainController($scope) {
    var vm = this;

    vm.testField = "this is the test field!";
}

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

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.directives")
    .directive("smoSearch", ["$sce", "moviesService", smoSearch ]);

function smoSearch($sce, moviesService) {
    return {
        restrict: "E",
        templateUrl: "src/views/smoSearch.html",
        controller: "SmoSearchController",
        controllerAs: "smoSearchController",
        require: ["smoSearch"],
        link: function(scope, element, attrs, controllers) {
            $(element).on("keyup", function (event) {
                var currentText = $(event.target).val();

                if (controllers[0].currentRequestHandle) {
                    controllers[0].currentRequestHandle.resolve();
                }

                if (!currentText.trim()) {
                    controllers[0].movies = [];
                    scope.$apply();
                    return;
                }

                var request = moviesService.getMovies(currentText);
                controllers[0].currentRequestHandle= request.handle;

                request
                    .promise
                    .success(function (data) {
                            var result = data;
                            result.forEach(function (element, index) {
                                element.image_code = $sce.trustAsHtml(element.image_code);
                                element.link_code = $sce.trustAsHtml(element.link_code);
                            });
                            controllers[0].movies = result;
                    })
                    .error(function (data) {
                        console.log(data);
                    });
            });
        }
    };
}

/**
 * Created by hamidbehnam on 5/28/16.
 */

angular.module("smo.services")
    .factory("moviesService", ["$http", "$q", moviesService]);

function moviesService($http, $q) {
    return {
        getMovies: getMovies
    };

    function getMovies(currentText) {
        var handle = $q.defer();
        return {
            promise: $http.jsonp("https://www.slated.com/films/autocomplete/profiles/?callback=JSON_CALLBACK",
                {
                    params: {
                        term: currentText
                    },
                    timeout: handle.promise
                }),
            handle: handle
        };
    }
}
