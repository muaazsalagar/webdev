/**
 * Created by muaazsalagar on 2/03/12.
 */
"use strict";

(function () {
    angular
        .module("BanquetApp")
        .factory("FormService", FormService);

    function FormService($http, $q) {

        var api = {
            createFormForUser: createFormForUser,

            findAllFormsForUser: findAllFormsForUser,

            deleteFormById: deleteFormById,

            updateFormById: updateFormById,

            findFormById: findFormById
        };
        return api;

        function createFormForUser(userID, form) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            $http.post(url, form).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllFormsForUser(userID) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/form";
            url = url.replace(":userId", userID);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteFormById(formID) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);

            $http.delete(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function updateFormById(formID, newForm) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);

            $http.put(url, newForm).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }
        function findFormById(formID) {

            var deferred = $q.defer();

            var url = "/api/assignment/form/:formId";
            url = url.replace(":formId", formID);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }
    }
})();
