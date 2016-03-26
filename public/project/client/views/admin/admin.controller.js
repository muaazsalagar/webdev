/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("BanquetApp")
        .controller("AdminController",AdminController);

    function AdminController($location,$scope){

        $scope.$location=$location;

    }
}) ();

