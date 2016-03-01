/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
    .module("MovieApp")
    .factory("MovieService", MovieService);

function MovieService($http) {

    var api = {
        findMoviesByTitle: findMoviesByTitle,
        findMovieByImdbId: findMovieByImdbId

    };

    return api;

    function findMoviesByTitle(title, callback)
    {
        $http.get("http://www.omdbapi.com/?s="+title)
            .success(callback);


    }

    function findMovieByImdbId(imdbId)
    {

    }
}


})();