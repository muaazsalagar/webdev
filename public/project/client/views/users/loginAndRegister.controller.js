/**
 * Created by muaazsalagar on 2/20/16.
 */


(function () {
    angular
        .module("BanquetApp")
        .controller("LoginRegisterController",LoginRegisterController);

    function LoginRegisterController($location, UserService){

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


        // register functions


        function register(username, password, vpassword, emailId){
            console.log("Register Called");

            var user={
                "_id":0,
                "username":username,
                "password":password,
                "roles": ["student"],
                "emailId":emailId
            };


            UserService.createUser(user, function(response) {

                //console.log("response from service"+response.username);
                if(response){
                    console.log(response);
                    UserService.setCurrentUser(response);
                    $location.url("/profile");

                }

            });

        }


    }
})();