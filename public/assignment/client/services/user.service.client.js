/**
 * Created by muaazsalagar on 2/03/12.
 */


"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http, $q, $rootScope) {

        var service = {
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            findUserById: findUserById,
            getCurrentUser: getCurrentUser,
            setCurrentUser: setCurrentUser,
            logout: logout
        };
        return service;


        function getCurrentUser() {

            return $http.get("/api/assignment/user/loggedin");
        }

        function setCurrentUser(user) {

            $rootScope.currentUser = user;
        }

        function logout() {

            return $http.post("/api/assignment/user/logout")
        }


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

        function findUserByUsername(username) {

            var deferred = $q.defer();

            var url = "/api/assignment/user?username=:username";
            url = url.replace(":username", username);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllUsers(callback) {

            var deferred = $q.defer();

            var url = "/api/assignment/user";

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createUser(user) {

            var deferred = $q.defer();

            var url = "/api/assignment/user";

            $http.post(url, user).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteUserById(userID) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);

            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function updateUser(userID, user) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);

            $http.put(url, user).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findUserById(userID) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:id";
            url = url.replace(":id", userID);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


    }
})();