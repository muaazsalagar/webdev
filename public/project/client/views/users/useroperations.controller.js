/**
 * Created by muaazsalagar on 2/20/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("UserOperationsController", UserOperationsController);

    function UserOperationsController($rootScope,BookingService) {
        var vm = this;

        // crud operations for Admin Panel


        vm.addBooking = addBooking;
        vm.removeBooking = removeBooking;
        vm.selectBooking = selectBooking;
        vm.updateBooking = updateBooking;
        vm.order = order;
        vm.predicate='bookingname';
        vm.reverse = true;

        var oldIndex = -1;



        var oldIndex = -1;

        function init() {

            vm.bookings = {};
            if($rootScope.currentUser)
            {
                var user_id=$rootScope.currentUser._id;
            }




            BookingService.findBookingByUserId(user_id)

                .then(

                    function (bookings) {

                        vm.bookings = bookings;

                    }
                );

        }
        // initialize the table when page loads
        init();


        function selectBooking($index) {

          //  var booking = vm.bookings[$index];

            var booking=$index;

            oldIndex = $index;
            // set the booking field to the selected row
            vm.booking = {
                _id: booking._id,
                bookingname: booking.bookingname,
                password: booking.password,
                firstName: booking.firstName,
                lastName: booking.lastName,
                roles: booking.roles
            }
        }

        function updateBooking(booking) {

            BookingService.updateBooking(booking._id, booking)

                .then(

                    function (response) {
                        // if successful update we get msg as updated
                        if(response === "Updated") {

                            init();
                            vm.booking = {};
                        }
                    }
                );
        }


        function addBooking(booking) {

            BookingService.createBooking(booking)
                .then(function (response) {

                        init();
                        vm.booking = {};

                    }
                );
        }


        // remove
        function removeBooking($index) {

            //var booking = vm.bookings[$index];

            var booking=$index;

            BookingService.deleteBookingById(booking._id)

                .then(function (response) {

                        init();
                    }
                );
        }


        function order(predicate) {

            vm.reverse = (vm.predicate === predicate)? !vm.reverse: false;
            vm.predicate = predicate;
        }


    }
})();
