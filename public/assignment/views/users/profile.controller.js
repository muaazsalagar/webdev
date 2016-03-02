/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location,$scope, UserService, $rootScope){

        $scope.update=update;

        //$scope.$location=$location;

        $scope.username=$rootScope.user.username;
        $scope.firstName=$rootScope.user.firstName;
        $scope.lastName=$rootScope.user.lastName;
        $scope.emailId=$rootScope.user.emailId;


        console.log("In Profile Controller");

        function update(userName,password,firstName, lastName, emailId){
            var userLoggedIn=$rootScope.user;
            var LoggedInUserId=userLoggedIn._id;


            var user={
                "username":userName,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "emailId":emailId
            };


            UserService.updateUser(LoggedInUserId,user, function (response) {

                $rootScope.user=response;

                console.log("Response From Service for Updated User");
                console.log(response);


            });


        };


    }
})();