/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("MovieApp")
    .controller("SearchController",searchController);

    function searchController($location,$scope, $http, $routeParams)
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
            console.log(title);

            // change the url to search with results
            $location.url("/search/"+title);

            $http.get("http://www.omdbapi.com/?s="+title)
                .success(render);
        }

        function render(response){
            console.log(response);
            $scope.data=response;
        }

    }

})();