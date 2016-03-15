/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController",ProfileController);

    function ProfileController($location, UserService, $rootScope){

        var vm=this;
        
        (function init () {

        })();
        
        vm.update=update;

        //vm.$location=$location;


        UserService.findUserByCredentials($rootScope.currentUser._id).then(function (response) {

            console.log("current User set is: ");
            console.log($rootScope.currentUser._id)
            vm.username=$rootScope.currentUser.username;
            vm.firstName=$rootScope.currentUser.firstName;
            vm.lastName=$rootScope.currentUser.lastName;
            vm.emailId=$rootScope.currentUser.emailId;

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