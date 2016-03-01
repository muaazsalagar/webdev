/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($location,$scope){

        $scope.$location=$location;



    }
}) ();
