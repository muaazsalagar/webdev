/**
 * Created by muaazsalagar on 2/03/16.
 */

"use strict";

(function() {
    angular
        .module("BanquetApp")
        .controller("PropertyController", PropertyController);

    function PropertyController($rootScope, PropertyService,ReviewService,UserService,BookingService, $location,$routeParams) {

        var propertyId=$routeParams.propertyId;


        var vm = this;
        // crud operations for Review Panel
        vm.addReview = addReview;
        vm.removeReview = removeReview;
        vm.selectReview = selectReview;
        vm.updateReview = updateReview;

        // for Booking
        vm.bookThePlace=bookThePlace;

        var dbUser;

        if($rootScope.currentUser)
        {
            var user_id=$rootScope.currentUser._id;
        }


        function initUserReviews() {
            console.log("In initUserReviews :");
            var propertyId=$routeParams.propertyId;
            console.log(propertyId);

            if($rootScope.currentUser)
            {
                var user_id=$rootScope.currentUser._id;
            }

            /*UserService.findUserById(user_id)
                .then(function (userFetched) {

                    dbUser=userFetched;


                });
*/

            ReviewService.findReviewByUserId(user_id,propertyId)
                .then(function (reviews) {

                    console.log("Fetched reviews posted by User :");
                    console.log(reviews);
                    vm.userReviews = reviews;

                });

        }


        function getAllReviews() {

            ReviewService.findReviewByPropertyId(propertyId)
                .then(function (response) {
                    vm.reviews=response;

                    console.log("Retrived Reviews for Property");

                    console.log("Getting reviews by Review ID");

                });

        }

        function init() {

            PropertyService.findPropertyById(propertyId).then(function (response) {


                vm.property=response;
                console.log("Retrived Property Details");
                // now get all user reviews
                getAllReviews();

                initUserReviews();


            });



        }
        init();




        var oldIndex = -1;

        function selectReview($index) {

            //  var a_review = vm.a_reviews[$index];

            var a_review=$index;

            oldIndex = $index;
            // set the a_review field to the selected row
            vm.a_review = {
                review: a_review.review,
                // da: a_review.a_reviewname

            }
        }

        function updateReview(a_review) {
            console.log(a_review);

            ReviewService.updateReviewById(a_review._id, a_review)

                .then(

                    function (response) {
                        // if successful update we get msg as updated
                        if(response === "Updated") {

                            initUserReviews();
                            getAllReviews();
                            vm.a_review = {};
                        }
                    }
                );
        }


        function addReview(a_review) {
            a_review.user_id=user_id;
            a_review.date_posted= new Date();
            a_review.property_id=propertyId;

            ReviewService.createReview(a_review)
                .then(function (response) {
                        console.log("After review creation");
                        console.log(response);

                        initUserReviews();
                        getAllReviews();
                        vm.a_review = {};

                    }
                );
        }


        // remove
        function removeReview($index) {

            //var a_review = vm.a_reviews[$index];

            var a_review=$index;
            console.log("FOR DELETE REVIEW IS:");

            console.log(a_review);

            ReviewService.deleteReviewById(a_review._id)

                .then(function (response) {
                    console.log("After delete");
                        initUserReviews();
                        getAllReviews();
                    }
                );
        }

        function bookThePlace(bookingRequest)
        {
            console.log("Booking Start");

            bookingRequest.user_id=user_id;

            //dbUser.user_id

            bookingRequest.property_id=propertyId;
           // bookingRequest.owner_id=vm.owner_id;

            console.log(bookingRequest);

            PropertyService.findPropertyById(propertyId).then(function(propertyDetails){
                bookingRequest.owner_id=propertyDetails.owner_id;

                BookingService.createBooking(bookingRequest)
                    .then(function (response) {
                            console.log("Booked !!");


                            vm.booking = {};

                        }
                    );

            });




        }


    }
})();
