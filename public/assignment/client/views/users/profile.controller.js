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


        UserService.findUserByCredentials($rootScope.currentUser._id).then(function (response) {

            console.log("current User set is: ");
            console.log($rootScope.currentUser._id)
            $scope.username=$rootScope.currentUser.username;
            $scope.firstName=$rootScope.currentUser.firstName;
            $scope.lastName=$rootScope.currentUser.lastName;
            $scope.emailId=$rootScope.currentUser.emailId;

            console.log("Data Set for Profile");


        });




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


            UserService.updateUserByID(userLoggedIn,user).then(function (respnse) {

                UserService.setCurrentUser(response);
                console.log("Response From Service:  Updated the User");
                console.log(response);

            });



        };


    }
})();