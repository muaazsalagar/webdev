/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("ManagerController", ManagerController);

    function ManagerController($rootScope, PropertyService, BookingService,$location,$routeParams) {

        // for the registration of the booking
        var vm = this;

        // crud operations for Admin Panel
        vm.addBooking = addBooking;
        vm.removeBooking = removeBooking;
        vm.selectBooking = selectBooking;
        vm.updateBooking = updateBooking;

        var oldIndex = -1;

        if($rootScope.currentUser)
        {
            var user_id=$rootScope.currentUser._id;
        }


        function init() {

            vm.bookings = {};
            console.log(user_id);

            BookingService.findBookingByOwnerId(user_id)

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
                user_id: booking.user_id,
                start_end: booking.start_date,
                end_date: booking.end_date,
                start_date: booking.start_date,
                property_id: booking.property_id,
                state: booking.state,



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

    }



    // END
})();
