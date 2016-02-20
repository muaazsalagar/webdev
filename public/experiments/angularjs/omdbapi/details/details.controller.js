/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("MovieApp")
    .controller("DetailsController", DetailsController);


    function DetailsController($routeParams, $http, $scope){
        var imDBID=$routeParams.imdbID;

        $http.get("http://www.omdbapi.com/?i="+imDBID)
        .success(renderMovie);
        function renderMovie(response){
            $scope.movie=response;

        }

    }



})();