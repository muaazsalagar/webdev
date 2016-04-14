/**
 * Created by muaazsalagar on 2/03/12.
 */

(function () {
    angular
        .module("BanquetApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            // declaration of methods by following standards of  papa john


            createUser:createUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,
            logout: logout,

            // Api
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers:findAllUsers,
            updateUserByID:updateUserByID,
            findUserByID:findUserByID,

        };

        return api;


        function findUserByCredentials(username, password) {

            var deferred = $q.defer();

            var url = "/api/assignment/user?username=:username&password=:password";
            url = url.replace(":username", username);
            url = url.replace(":password", password);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createUser(user)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user";
            $http.post(url,user).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function getCurrentUser() {

            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function logout() {

            return $http.post("/api/assignment/user/logout")
        }

        function findUserByUsername(username)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user?username=username";
            url=url.replace(":username",username);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function findAllUsers(){
            var deferred=$q.defer();
            var url="/api/assignment/user";

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });


            return deferred.promise;
        }

        function updateUserByID(userId,user)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user/:id";
            url=url.replace(":id",userId);
            console.log(url);
            console.log(userId);

            $http.put(url,user).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteUserById(user)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user/:id";
            $http.delete(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findUserByID(userId)
        {
            console.log("Client Calling the finduserID to the server");
            var deferred=$q.defer();
            var url="/api/assignment/user/:id";
            url=url.replace(":id",userId);
            console.log(url);
            console.log(userId);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }


    }
})();