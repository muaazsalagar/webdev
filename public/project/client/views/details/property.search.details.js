/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("BanquetApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location,$scope, UserService, $rootScope){

        $scope.update=update;

        //$scope.$location=$location;

       /* $scope.username=$rootScope.currentUser.username;
        $scope.firstName=$rootScope.currentUser.firstName;
        $scope.lastName=$rootScope.currentUser.lastName;
        $scope.emailId=$rootScope.currentUser.emailId;

*/
        console.log("In Profile Controller");

        function update(username,password,firstName, lastName, emailId){
            var userLoggedIn=$rootScope.currentUser;
            var LoggedInUserId=userLoggedIn._id;
            console.log("User Logged in ID:  ");
            console.log(userLoggedIn);

            var user={
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "emailId":emailId
            };


            UserService.updateUser(LoggedInUserId,user, function (response) {


                UserService.setCurrentUser(response);
                console.log("Response From Service:  Updated the User");
                console.log(response);

            });

        };


    }
})();