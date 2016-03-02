/**
 * Created by muaazsalagar on 2/20/16.
 */

(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($location,$scope, UserService){

            $scope.$location=$location;
            $scope.logout=logout;

        function logout(){

                  UserService.setCurrentUser(null);
                  // changing url to be new home
                  console.log("User logged out");
                  $location.url("/home");


        }



    }
}) ();
