/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("ManagerController", ManagerController);

    function ManagerController($rootScope, PropertyService, UserService,$location,$routeParams) {

        // for the registration of the user
        var vm = this;

        // crud operations for Admin Panel
        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;

        var oldIndex = -1;

        function init() {

            vm.users = {};

            UserService.findAllUsers()

                .then(

                    function (users) {

                        vm.users = users;

                    }
                );

        }
        // initialize the table when page loads
        init();


        function selectUser($index) {

            //  var user = vm.users[$index];

            var user=$index;

            oldIndex = $index;
            // set the user field to the selected row
            vm.user = {
                _id: user._id,
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                roles: user.roles
            }
        }

        function updateUser(user) {

            UserService.updateUser(user._id, user)

                .then(

                    function (response) {
                        // if successful update we get msg as updated
                        if(response === "Updated") {

                            init();
                            vm.user = {};
                        }
                    }
                );
        }


        function addUser(user) {

            UserService.createUser(user)
                .then(function (response) {

                        init();
                        vm.user = {};

                    }
                );
        }


        // remove
        function removeUser($index) {

            //var user = vm.users[$index];

            var user=$index;

            UserService.deleteUserById(user._id)

                .then(function (response) {

                        init();
                    }
                );
        }

    }



    // END
})();
