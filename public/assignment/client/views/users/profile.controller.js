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

        console.log("current User set is: ");
        console.log($rootScope.currentUser._id);

        console.log($rootScope.currentUser);


        vm.username=$rootScope.currentUser.username;
        vm.firstName=$rootScope.currentUser.firstName;
        vm.lastName=$rootScope.currentUser.lastName;
        vm.emailId=$rootScope.currentUser.emailId;


        // method declarations:
        vm.update=update;

        //vm.$location=$location;

        console.log("Data Set for Profile");

        console.log("In Profile Controller");

        function update(username,password,firstName, lastName, emailId){
            var userLoggedIn=$rootScope.currentUser;

            var LoggedInUserId=userLoggedIn._id;

            console.log("User Logged in ID:  ");
            console.log(userLoggedIn);

            var user={
                "_id":LoggedInUserId,
                "username":username,
                "password":password,
                "firstName":firstName,
                "lastName":lastName,
                "emailId":emailId
            };


            UserService.updateUserByID(LoggedInUserId,user).then(function (response) {


                console.log("Response From Service:  Updated the User");
                if(response)
                {

                    UserService.findUserByID(LoggedInUserId).then(function (response){

                        UserService.setCurrentUser(response);
                        vm.username=$rootScope.currentUser.username;
                        vm.firstName=$rootScope.currentUser.firstName;
                        vm.lastName=$rootScope.currentUser.lastName;
                        vm.emailId=$rootScope.currentUser.emailId;
                        console.log("response");
                        console.log("Updated User");

                    });

                }
                console.log(response);

            });


        };


    }
})();