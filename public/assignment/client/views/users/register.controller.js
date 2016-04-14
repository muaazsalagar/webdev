/**
 * Created by muaazsalagar on 2/20/16.
 */


(function() {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService, $rootScope, $location) {

        // for the registration of the user

            var vm = this;

            vm.register = register;

            function register(user) {

                // get emails seperated:

                user.emails = user.emails.trim().split(",");

                UserService.register(user).then(function(users) {

                    // get by username
                    UserService.findUserByUsername(user.username).then(function (registeredUser) {

                        // set session

                        UserService.setCurrentUser(registeredUser);

                        // step 2 redirect

                        $location.url("/profile");
                    });
                });
            }

    }
})();