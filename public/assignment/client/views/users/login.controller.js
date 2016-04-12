/**
 * Created by muaazsalagar on 2/20/16.
 */


"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController);

    function LoginController(UserService, $location) {

        var vm = this;

        vm.login = login;

        function login(user) {

            // call User Service login
            UserService.login(user).then(isUserPresent);
        }

        // check if already present
        function isUserPresent(response) {

            if(response) {

                UserService.setCurrentUser(response);

                // if success from user present change url to profile
                $location.url("/profile");
            }
        }
    }
})();