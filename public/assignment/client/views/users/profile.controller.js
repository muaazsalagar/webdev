/**
 * Created by muaazsalagar on 2/20/16.
 */
"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController($rootScope, UserService) {

        var vm = this;

        function init() {

            vm.user= {};

            UserService.findUserById($rootScope.currentUser._id)

                .then(

                    function (res) {

                        vm.user = res;
                        // new added feature


                        vm.user.emails = vm.user.emails.join(",");

                        vm.user.phones = vm.user.phones.join(",s");
                    }
                );

        }
        init();

        vm.update = update;

        function update(user) {
            // get updated emails

            user.emails = user.emails.trim().split(",");
            user.phones = user.phones.trim().split(",");

            UserService.updateUser($rootScope.currentUser._id, user).then(updateProfilePage);
        }

        function updateProfilePage(response) {

            if (response === "Updated") {

                UserService.findUserById($rootScope.currentUser._id).then (function (updatedUser) {

                    vm.user.username = updatedUser.username;
                    vm.user.firstName = updatedUser.firstName;
                    vm.user.lastName = updatedUser.lastName;
                    vm.user.emails = updatedUser.emails;

                    UserService.setCurrentUser(updatedUser);
                });
            }
        }
    }
})();