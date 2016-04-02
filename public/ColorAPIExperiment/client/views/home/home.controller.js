/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("ColorApp")
        .controller("HomeController",HeaderController);

    function HeaderController($location, UserService, $rootScope){

        var vm=this;


        function init()
        {

        }
        init();

    }
}) ();
