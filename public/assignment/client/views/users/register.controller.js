/**
 * Created by muaazsalagar on 2/20/16.
 */


(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {

        var vm = this;

        vm.register = register;

        // for the registration of th user


        function register(user) {
                // new feature to added with emails support

            user.emails = user.emails.trim().split(",");

            UserService.createUser(user).then(function(users) {

                UserService.findUserByUsername(user.username).then(function (newUser) {

                    // set the Seession

                    UserService.setCurrentUser(newUser);

                    $location.url("/profile");
                });
            });
        }
    }
})();