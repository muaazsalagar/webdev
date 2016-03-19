/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HomeController",HeaderController);

    function HeaderController($location, UserService, $rootScope){

        var vm=this;


        function init()
        {

        }
        init();

    }
}) ();
