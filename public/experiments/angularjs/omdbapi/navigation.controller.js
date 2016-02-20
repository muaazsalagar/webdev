/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("MovieApp")
        .controller("NavController",NavController);

    function NavController($location,$scope){

        $scope.$location=$location;

    }
}) ();