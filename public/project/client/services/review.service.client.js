/**
 * Created by muaazsalagar on 2/03/12.
 */

(function () {
    angular
        .module("BanquetApp")
        .factory("ReviewService", ReviewService);

    function ReviewService($http, $q, $rootScope) {

        var api = {
            // declaration of methods by following standards of  papa john


            createReview:createReview,
            setCurrentReview:setCurrentReview,
            getCurrentReview:getCurrentReview,

            // Api
            findReviewByCredentials:findReviewByCredentials,
            findReviewByReviewname:findReviewByReviewname,
            findAllReviews:findAllReviews,

            updateReviewById:updateReviewById,
            findReviewByID:findReviewByID,
            deleteReviewById:deleteReviewById,
            findReviewByPropertyId:findReviewByPropertyId,
            findReviewByUserId:findReviewByUserId
        };

        return api;


        function findReviewByCredentials(reviewname, password) {

            var deferred = $q.defer();

            var url = "/api/banquet/reviews/review?reviewname=:reviewname&password=:password";
            url = url.replace(":reviewname", reviewname);
            url = url.replace(":password", password);

            $http.get(url).success (function (response) {
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function createReview(review)
        {
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review";
            $http.post(url,review).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function setCurrentReview (review) {
            $rootScope.currentReview = review;
        }

        function getCurrentReview () {
            return $rootScope.currentReview;
        }

        function findReviewByReviewname(reviewname)
        {
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review?reviewname=reviewname";
            url=url.replace(":reviewname",reviewname);
            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;


        }

        function findAllReviews(){
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review";

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });


            return deferred.promise;
        }

        function updateReviewById(reviewId,review)
        {
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review/:id";
            url=url.replace(":id",reviewId);
            console.log(url);
            console.log(reviewId);

            $http.put(url,review).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function deleteReviewById(reviewID)
        {
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review/:id";
            url = url.replace(":id", reviewID);
            $http.delete(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;
        }

        function findReviewByID(reviewId)
        {
            console.log("Client Calling the findreviewID to the server");
            var deferred=$q.defer();
            var url="/api/banquet/reviews/review/:id";
            url=url.replace(":id",reviewId);
            console.log(url);
            console.log(reviewId);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }



        function findReviewByPropertyId(propertyId)
        {
            console.log("Client Calling the findReviewByPropertyId to the server");
            var deferred=$q.defer();
            var url="/api/banquet/property/all_reviews/:id";
            url=url.replace(":id",propertyId);
            console.log(url);
            console.log(propertyId);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }

        function findReviewByUserId(userId,propertyId)
        {
            console.log("Client Calling the findReviewByUserId to the server");
            var deferred=$q.defer();
            var url="/api/banquet/property/reviewsByUser/:id/:propertyId";
            url=url.replace(":id",userId);
            url=url.replace(":propertyId",propertyId);
            console.log(url);
            console.log(userId);

            $http.get(url).success(function(response){
                deferred.resolve(response);
            });

            return deferred.promise;

        }





    }
})();