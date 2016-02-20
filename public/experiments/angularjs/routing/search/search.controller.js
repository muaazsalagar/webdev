/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
    .module("MovieApp")
    .controller("SearchController",searchController);

    function searchController($scope, $http)
    {
        // event handler declareation
        $scope.search=search;


        // function handler implementation

        function search (title){
            console.log(title);
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(render);

        }

        function render(response){
            console.log(response);
            $scope.data=response;
        }

    }

})();