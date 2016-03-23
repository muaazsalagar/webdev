/**
 * Created by muaazsalagar on 2/03/12.
 */
"use strict";

(function () {
    angular
        .module("ColorApp")
        .factory("ColorService", ColorService);

    function ColorService($http, $q) {

        var api = {
            createColorForUser: createColorForUser,

            findAllColorsForUser: findAllColorsForUser,

            deleteColorById: deleteColorById,

            updateColorById: updateColorById,

            findColorById: findColorById,
            findColorsByColor:findColorsByColor
        };
        return api;

        function createColorForUser(userID, color) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/color";
            url = url.replace(":userId", userID);

            $http.post(url, color).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findAllColorsForUser(userID) {

            var deferred = $q.defer();

            var url = "/api/assignment/user/:userId/color";
            url = url.replace(":userId", userID);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteColorById(colorID) {

            var deferred = $q.defer();

            var url = "/api/assignment/color/:colorId";
            url = url.replace(":colorId", colorID);

            $http.delete(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function updateColorById(colorID, newColor) {

            var deferred = $q.defer();

            var url = "/api/assignment/color/:colorId";
            url = url.replace(":colorId", colorID);

            $http.put(url, newColor).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }
        function findColorById(colorID) {

            var deferred = $q.defer();

            var url = "/api/assignment/color/:colorId";
            url = url.replace(":colorId", colorID);

            $http.get(url).success(function(response) {

                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findColorsByColor(color) {

            var deferred = $q.defer();
            var url = "/api/assignment/color/:color";
            url = url.replace(":color", color);

            console.log(url);

            $http.get(url).success(function (response) {

                deferred.resolve(response);
            });

            return deferred.promise;
        }


    }
})();
