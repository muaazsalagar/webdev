/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController",LoginController);

    function LoginController($location,$scope, UserService, $rootScope){

        $scope.login=login;
        $scope.$location=$location;
        //console.log("In Register conyroller");

        function login(username, password){
            console.log("Login Called");

            UserService.findUserByCredentials(username, password, function(response) {

                //console.log("response from service"+response.username);
                //$rootScope.user=response;
                var userChecked=response;
                //console.log("Respomse from Login service:");
                //console.log(response);

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