/**
 * Created by muaazsalagar on 3/13/16.
 */

"use strict"



module.exports= function (db,mongoose) {

    var ReviewSchema = require("./review.schema.server.js")(mongoose);

    var reviewModel = mongoose.model('Review', ReviewSchema);


    var api={

        createReview:createReview,
        findAllReviews:findAllReviews,
        findReviewById:findReviewById,
        updateReviewById:updateReviewById,
        deleteReviewById:deleteReviewById,
        findReviewByUserId:findReviewByUserId,

        // unused functions

        findReviewByReviewname:findReviewByReviewname,
        findReviewByCredentials:findReviewByCredentials,
        findReviewByPropertyId:findReviewByPropertyId



    };

    return api;


    function createReview(review){

        console.log("Review Created!! ");

        return reviewModel.create(review);
    }


    function findAllReviews(){
        return reviewModel.find({});


    }

    function  findReviewById(reviewID)
    {
        reviewID=parseInt(reviewID);

        return reviewModel.findById(reviewID);

    }

    function  findReviewByPropertyId(propertyID)
    {

        return reviewModel.find({property_id:propertyID});
        //  return reviewsForProperty;

    }

    function  findReviewByUserId(userID,propertyID)
    {

        return reviewModel.find({user_id:userID,property_id:propertyID});
        //  return reviewsForProperty;
    }

    function  deleteReviewById(reviewID){

        return (reviewModel.findByIdAndRemove(reviewID));
    }


    function  updateReviewById(reviewId, review){

        //reviewId= parseInt(reviewId);
        return reviewModel.findOneAndUpdate(reviewId,review);
    }



    function findReviewByReviewname(reviewName)
    {

        // no need
        for (var i in mock)
        {
            if(mock[i].reviewname==reviewName)
            {
                return mock[i];

            }
        }
        return null;
    }



    function findReviewByCredentials(credentials)
    {
        for (var i in mock)
        {
            if(mock[i].reviewname==credentials.reviewname &&
                mock[i].password==credentials.password)
            {
                return mock[i];

            }
        }
        return null;
    }
};