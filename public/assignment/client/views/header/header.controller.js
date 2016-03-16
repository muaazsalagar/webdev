/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location, UserService, $rootScope){

        var vm=this;
        vm.$location=$location;
        vm.logout=logout;

        function init()
        {

        }
        init();

    function logout(){

            UserService.setCurrentUser(null);
            $rootScope.currentUser=null;
            // changing url to be new home
            console.log("User logged out");
            $location.url("/home");


        }



    }
}) ();
