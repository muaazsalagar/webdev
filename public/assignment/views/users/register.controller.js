/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($location,$scope, UserService, $rootScope){

        $scope.register=register;
        $scope.$location=$location;
        //console.log("In Register conyroller");

        function register(username, password, vpassword, email){
            console.log("Register Called");

            var user={
                "username":username,
                "password":password,
                "roles": ["student"]
            };

            console.log(user);
            UserService.createUser(user, function(response) {

                //console.log("response from service"+response.username);
                $rootScope.user=response;
                $location.url("profile");
            });

        }



    }
})();