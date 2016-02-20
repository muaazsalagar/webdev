/**
 * Created by muaazsalagar on 2/17/16.
 */


(function() {
    angular
    .module("MovieApp")
    .controller("SearchController", searchController);

    function searchController($scope)
    {
        $scope.search=search;
        $scope.title="Star Wars";

        function search(title){


        }
    }




})();

