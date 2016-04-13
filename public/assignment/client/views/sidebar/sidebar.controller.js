/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("SidebarController",SidebarController);

    function SidebarController($location, $rootScope){

        var vm = this;

        function init() {

            vm.$location = $location;
        }
        init();


    }




}) ();
