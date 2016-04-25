/**
 * Created by muaazsalagar on 2/20/16.
 */

"use strict";

(function() {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($rootScope,UserService) {
        var vm = this;

        // crud operations for Admin Panel


        vm.addUser = addUser;
        vm.removeUser = removeUser;
        vm.selectUser = selectUser;
        vm.updateUser = updateUser;
        vm.order = order;
        vm.predicate='username';
        vm.reverse = true;

        var oldIndex = -1;



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


        function order(predicate) {

            vm.reverse = (vm.predicate === predicate)? !vm.reverse: false;
            vm.predicate = predicate;
        }


    }
})();
