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
