/**
 * Created by muaazsalagar on 2/03/12.
 */

"use strict";

(function () {
    angular
        .module("BanquetApp")
        .factory("BookingService", BookingService);

    function BookingService($http, $q, $rootScope) {

        var service = {

            login:login,
            logout: logout,
            getCurrentBooking: getCurrentBooking,
            setCurrentBooking: setCurrentBooking,
            register:register,
            findBookingByBookingname: findBookingByBookingname,
            findBookingByOwnerId: findBookingByOwnerId,
            findAllBookings: findAllBookings,
            createBooking: createBooking,
            deleteBookingById: deleteBookingById,
            updateBooking: updateBooking,
            findBookingById: findBookingById

        };
        return service;

        // instead of find booking by credentials a common method for login
        function login(booking) {

            return $http.post("/api/assignment/login", booking);

        }

        function logout() {

            return $http.post("/api/assignment/booking/logout")
        }

        function getCurrentBooking() {

            return $http.get("/api/assignment/booking/loggedin");
        }

        function setCurrentBooking(booking) {

            $rootScope.currentBooking = booking;
        }


        // register

        function register(booking) {

            var deferred = $q.defer();
            var url = "/api/assignment/register";

            $http.post(url, booking).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function findBookingByCredentials(bookingname, password) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking?bookingname=:bookingname&password=:password";
            url = url.replace(":bookingname", bookingname);
            url = url.replace(":password", password);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findBookingByBookingname(bookingname) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking?bookingname=:bookingname";
            url = url.replace(":bookingname", bookingname);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findBookingByOwnerId(ownerId) {

            var deferred = $q.defer();

            var url = "/api/assignment/bookingByOwnerId/:id";
            url = url.replace(":id", ownerId);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        // for admin functionality
        function findAllBookings() {

            var deferred = $q.defer();

            var url = "/api/assignment/booking";

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function createBooking(booking) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking";

            $http.post(url, booking).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


        function deleteBookingById(bookingID) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking/:id";
            url = url.replace(":id", bookingID);

            $http.delete(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function updateBooking(bookingID, booking) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking/:id";
            url = url.replace(":id", bookingID);

            $http.put(url, booking).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findBookingById(bookingID) {

            var deferred = $q.defer();

            var url = "/api/assignment/booking/:id";
            url = url.replace(":id", bookingID);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }


    }
})();