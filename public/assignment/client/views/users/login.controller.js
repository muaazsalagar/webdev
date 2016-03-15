/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService, $rootScope){

        var vm=this;
        
        vm.login=login;
        vm.$location=$location;

        (function init () {

        })();

        //console.log("In Register controller");

        function login(username, password){
            console.log("Login Called");

            UserService.findUserByCredentials(username,password).then(function(response){

                var userChecked=response;
                console.log("response from findUserByCredentials service:");
                console.log(response);

                if(userChecked)
                {
                    $location.url("profile");
                    UserService.setCurrentUser(response);
                }
                else
                {
                    console.log("Wrong Password Combination");
                }

            });

        }

    }
})();