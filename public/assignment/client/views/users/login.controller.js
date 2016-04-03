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

            UserService.findUserByCredentials(user.username, user.password).then(isUserPresent);
        }

        // check if already present
        function isUserPresent(response) {

            if(response) {

                UserService.setCurrentUser(response);

                $location.url("/profile");
            }
        }
    }
})();