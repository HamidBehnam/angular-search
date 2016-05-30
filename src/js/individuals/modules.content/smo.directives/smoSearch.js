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
