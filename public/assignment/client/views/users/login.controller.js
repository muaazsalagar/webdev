/**
 * Created by muaazsalagar on 2/20/16.
 */


(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location, UserService){

        // Declaring Virtual model
        var vm=this;
        vm.login=login;

        //console.log("In Register controller");


        function login(username, password){
            console.log("Login Called");

            UserService.findUserByCredentials(username,password).then(isUserVerified);

        }


        function isUserVerified(response){
            if(response)
            {
                UserService.setCurrentUser(response);
                $location.url("/profile");

            }
            else {

                console.log("Not a Valid User!");
            }

        }

    }
})();