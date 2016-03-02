/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {
        var users=[];
        users=[
            {	"_id":123, "firstName":"Alice","lastName":"Wonderland",
                "username":"alice",  "password":"alice",   "roles": ["student"],"emailId":"asd.com"	},
            {	"_id":234, "firstName":"Bob", "lastName":"Hope",
                "username":"bob","password":"bob", "roles": ["admin"]	,"emailId":""},
            {	"_id":345, "firstName":"Charlie", "lastName":"Brown",
                "username":"charlie","password":"charlie", "roles": ["faculty"]	,"emailId":""},
            {	"_id":456, "firstName":"Dan",  "lastName":"Craig",
                "username":"dan","password":"dan",  "roles": ["faculty", "admin"],"emailId":""},
            {	"_id":567, "firstName":"Edward", "lastName":"Norton",
                "username":"ed","password":"ed","roles": ["student"]	,"emailId":""},
            {	"_id":1, "firstName":"m", "lastName":"m",
                "username":"m", "password":"m", "roles": ["student"],"emailId":""}
        ];


        var api = {
            // declaration of methods by following standads of john papas

            findUserByCredentials: findUserByCredentials,
            createUser:createUser,
            updateUser:updateUser

        };

        return api;


        function findUserByCredentials(username, password, callback)
        {
            var userIndex = -1;
            for(var i=0;  i<users.length;i++ )
            {
                if(users[i].username==username && users[i].password==password){
                    //console.log("Login User Found From API called");
                    //$rootScope.user=auser;
                    userIndex = i;
                    //callback(users[i]);

                    break;

                }
            }
            userIndex > -1 ? callback(users[userIndex]) : callback(null);

        }

        function createUser(user, callback)
        {
            user._id= (new Date).getTime();
            users.push(user);
            console.log("Create User from API called")
            console.log(users)

            callback(user);

        }

        function updateUser(userId,user, callback)
        {
            // logic to update based on userId
            // FindById and then update the user
            var updatedUser;
            for (auser in users){
                if(userId==auser._id)
                {

                    console.log("Match found");
                    auser.firstName=user.firstName;
                    auser.lastName=user.lastName;
                    auser.password=user.password;
                    auser.emailId=user.emailId;
                    updatedUser=auser;
                    break;
                }
            }

            callback(updatedUser);
        }
    }
})();