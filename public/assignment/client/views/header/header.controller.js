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

        function logout() {

            UserService.logout().then(function(response) {

                // delete from rootScope
                UserService.setCurrentUser(null);

                // changing url to home
                $location.url("/home");
            });
        }



    }
}) ();
