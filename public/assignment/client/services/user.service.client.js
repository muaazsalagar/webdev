/**
 * Created by muaazsalagar on 2/20/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var api = {
            // declaration of methods by following standads of john papas


            createUser:createUser,
            updateUser:updateUser,
            setCurrentUser:setCurrentUser,
            getCurrentUser:getCurrentUser,

            // Api
            findUserByCredentials:findUserByCredentials,
            findUserByUsername:findUserByUsername,
            findAllUsers:findAllUsers,
            updateUser:updateUser,
            deleteUserById:deleteUserById
        };

        return api;


        function findUserByCredentials(username, password)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user?username=:username&password=:password";
            url=url.replace(":username",username);
            url=url.replace(":password",password);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createUser(user)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user";
            $http.post(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }

        function getCurrentUser () {
            return $rootScope.currentUser;
        }

        function findUserByUsername(username)
        {
            var deferred=$q.defer();
            var url="/api/assignment/user?username=username";
            url.replace(":username",username);
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

        function updateUser(userId)
        {
            var deferred=$q.defer();
            var url="updateUser";
            $http.put(url).success(function(response){
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


    }
})();