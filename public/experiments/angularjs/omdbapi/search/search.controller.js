/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("MovieApp")
    .controller("SearchController",searchController);

    function searchController(MovieService, $location,$scope, $http, $routeParams)
    {
        var title=$routeParams.title;

        if(title)
        {
            search(title);
        }
        // event handler declareation
        $scope.search=search;

        // function handler implementation

        function search (title){
            //console.log(title);

            // change the url to search with results
            $location.url("/search/"+title);
            MovieService.findMoviesByTitle(title, render);

            // previously we were calling from controller
            // which is bad design controller should not know where to fetch from

            //$http.get("http://www.omdbapi.com/?s="+title)
            //    .success(render);
        }

        function render(response){
            //console.log(response);
            $scope.data=response;
        }

    }

})();